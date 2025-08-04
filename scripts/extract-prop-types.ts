import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

interface PropInfo {
  name: string
  types: string[]
  required: boolean
  description?: string
  unionValues?: string[] // For literal union types like 'button' | 'submit' | 'reset'
}

interface ComponentInfo {
  [propName: string]: PropInfo
}

interface ComponentDefaults {
  [componentName: string]: Record<string, any>
}

// Load defaults using the actual runtime module approach
async function loadDefaults(): Promise<ComponentDefaults> {
  const defaults: ComponentDefaults = {}

  // Component names that we know exist
  const componentNames = [
    'button', 'badge', 'appbar', 'carousel', 'checkbox', 'checkboxgroup',
    'drawer', 'progress', 'select', 'skeleton', 'slider', 'textarea',
    'textfield', 'toast', 'tooltip',
  ]

  for (const componentName of componentNames) {
    try {
      // Use dynamic import to load the actual default modules
      const defaultsPath = path.resolve(__dirname, `../src/runtime/defaults/${componentName}.ts`)

      if (fs.existsSync(defaultsPath)) {
        // Convert to file URL for proper ESM import
        const fileUrl = `file://${defaultsPath.replace(/\\/g, '/')}`
        const module = await import(fileUrl)

        if (module.default) {
          defaults[componentName] = module.default
          console.log(`✅ Loaded ${componentName} defaults via runtime import`)
        }
        else {
          console.warn(`❌ No default export found in ${componentName}.ts`)
        }
      }
      else {
        console.warn(`❌ Defaults file not found: ${defaultsPath}`)
      }
    }
    catch (error) {
      console.warn(`❌ Failed to load ${componentName} defaults:`, error.message)

      // Fallback to file parsing if runtime import fails
      try {
        const fallbackDefaults = await extractDefaultsFromFile(componentName)
        if (Object.keys(fallbackDefaults).length > 0) {
          defaults[componentName] = fallbackDefaults
          console.log(`⚠️ Loaded ${componentName} defaults via fallback parsing`)
        }
      }
      catch (fallbackError) {
        console.warn(`❌ Fallback parsing also failed for ${componentName}:`, fallbackError.message)
        defaults[componentName] = {}
      }
    }
  }

  return defaults
}

// Fallback function for when runtime import fails
async function extractDefaultsFromFile(componentName: string): Promise<Record<string, any>> {
  const filePath = path.resolve(__dirname, `../src/runtime/defaults/${componentName}.ts`)

  if (!fs.existsSync(filePath)) {
    return {}
  }

  // Create a temporary compiled version for safer evaluation
  const content = fs.readFileSync(filePath, 'utf-8')

  // Remove import statements and export/satisfies syntax
  const cleanContent = content
    .replace(/import.*from.*['"].*['"];?\s*/g, '') // Remove imports
    .replace(/export\s+default\s+/, 'const result = ') // Replace export with assignment
    .replace(/\s+satisfies\s+\w+/, '') // Remove satisfies clause

  // Add return statement
  const executableContent = cleanContent + '\nreturn result;'

  try {
    // Use Function constructor to safely evaluate
    const func = new Function(executableContent)
    return func() || {}
  }
  catch (error) {
    console.warn(`Failed to parse ${componentName} with Function constructor:`, error.message)
    return {}
  }
}

function extractTypeString(typeNode: ts.TypeNode, checker: ts.TypeChecker): string[] {
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.flatMap(t => extractTypeString(t, checker))
  }

  if (ts.isLiteralTypeNode(typeNode)) {
    if (ts.isStringLiteral(typeNode.literal)) {
      return [typeNode.literal.text]
    }
    if (ts.isNumericLiteral(typeNode.literal)) {
      return ['number']
    }
    if (typeNode.literal.kind === ts.SyntaxKind.TrueKeyword) {
      return ['boolean']
    }
    if (typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) {
      return ['boolean']
    }
  }

  if (ts.isTypeLiteralNode(typeNode)) {
    return ['object']
  }

  if (ts.isArrayTypeNode(typeNode)) {
    return ['array']
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = typeNode.typeName.getText()
    if (typeName === 'Array') {
      return ['array']
    }
    return [typeName.toLowerCase()]
  }

  // Handle primitive types
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return ['string']
    case ts.SyntaxKind.NumberKeyword:
      return ['number']
    case ts.SyntaxKind.BooleanKeyword:
      return ['boolean']
    case ts.SyntaxKind.ObjectKeyword:
      return ['object']
    case ts.SyntaxKind.UndefinedKeyword:
      return ['undefined']
    default:
      return ['any']
  }
}

function extractUnionValues(typeNode: ts.TypeNode): string[] | undefined {
  if (ts.isUnionTypeNode(typeNode)) {
    const literals: string[] = []

    for (const unionType of typeNode.types) {
      if (ts.isLiteralTypeNode(unionType) && ts.isStringLiteral(unionType.literal)) {
        literals.push(unionType.literal.text)
      }
    }

    return literals.length > 0 ? literals : undefined
  }

  return undefined
}

function extractPropsFromInterface(
  interfaceDecl: ts.InterfaceDeclaration,
  checker: ts.TypeChecker,
): ComponentInfo {
  const props: ComponentInfo = {}

  for (const member of interfaceDecl.members) {
    if (ts.isPropertySignature(member) && member.name) {
      const propName = member.name.getText()
      const isOptional = !!member.questionToken

      if (member.type) {
        const types = extractTypeString(member.type, checker)
        const unionValues = extractUnionValues(member.type)

        props[propName] = {
          name: propName,
          types: types.filter(t => t !== 'undefined'), // Remove undefined from types
          required: !isOptional,
          unionValues,
        }

        // Extract JSDoc comments if available
        const jsDocTags = ts.getJSDocTags(member)
        const descriptionTag = jsDocTags.find(tag => tag.tagName?.getText() === 'description')
        if (descriptionTag && descriptionTag.comment) {
          props[propName].description = typeof descriptionTag.comment === 'string'
            ? descriptionTag.comment
            : descriptionTag.comment.map(c => c.text).join('')
        }
      }
    }
  }

  return props
}

function extractComponentTypes(): Record<string, ComponentInfo> {
  const propsFilePath = path.resolve(__dirname, '../src/runtime/types/props.ts')

  if (!fs.existsSync(propsFilePath)) {
    throw new Error(`Props file not found: ${propsFilePath}`)
  }

  // Create TypeScript program
  const program = ts.createProgram([propsFilePath], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
  })

  const sourceFile = program.getSourceFile(propsFilePath)
  const checker = program.getTypeChecker()

  if (!sourceFile) {
    throw new Error('Could not load props source file')
  }

  const result: Record<string, ComponentInfo> = {}

  // Visit all interface declarations
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text

      // Check if it's a component props interface (ends with 'Props')
      if (interfaceName.endsWith('Props')) {
        const componentName = interfaceName.replace('Props', '').toLowerCase()
        result[componentName] = extractPropsFromInterface(node, checker)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return result
}

async function generatePropTypesFile() {
  console.log('🔍 Extracting TypeScript prop types...')

  try {
    // Extract types from TypeScript interfaces
    const componentTypes = extractComponentTypes()

    // Load default values using runtime approach
    console.log('📦 Loading component defaults via runtime imports...')
    const defaults = await loadDefaults()

    // Combine type information with defaults
    const combinedData = {
      types: componentTypes,
      defaults,
      generated: new Date().toISOString(),
      version: '1.0.0',
    }

    // Ensure output directory exists
    const outputDir = path.resolve(__dirname, '../docs/generated')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write the generated file
    const outputPath = path.join(outputDir, 'prop-types.json')
    fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2))

    console.log('✅ Successfully generated prop types file:', outputPath)
    console.log(`📊 Extracted ${Object.keys(componentTypes).length} components`)
    console.log(`📦 Loaded ${Object.keys(defaults).length} default configurations`)

    // Log detailed summary
    Object.entries(componentTypes).forEach(([component, props]) => {
      const componentDefaults = defaults[component]
      const hasDefaults = componentDefaults && Object.keys(componentDefaults).length > 0
      const defaultsCount = hasDefaults ? Object.keys(componentDefaults).length : 0

      console.log(`   - ${component}: ${Object.keys(props).length} props, ${defaultsCount} defaults ${hasDefaults ? '✅' : '❌'}`)

      // Show nested object structure if present
      if (hasDefaults && componentDefaults.color && typeof componentDefaults.color === 'object') {
        console.log(`     └─ color object with ${Object.keys(componentDefaults.color).length} properties`)
      }
    })
  }
  catch (error) {
    console.error('❌ Failed to extract prop types:', error)
    process.exit(1)
  }
}

// Run the extraction
generatePropTypesFile()
