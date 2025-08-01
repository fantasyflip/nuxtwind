export const CSS_TEMPLATES = {
  // Main Tailwind import
  tailwindImport: '@import "tailwindcss";',

  // Theme colors
  primaryColor: `@theme static {
  /* Primary Color Scale - Autogenerated by NuxtWind Module */
  --color-primary-50: #ecfeff;
  --color-primary-100: #cffafe;
  --color-primary-200: #a5f3fc;
  --color-primary-300: #67e8f9;
  --color-primary-400: #22d3ee;
  --color-primary-500: #06b6d4;
  --color-primary-600: #0891b2;
  --color-primary-700: #0e7490;
  --color-primary-800: #155e75;
  --color-primary-900: #164e63;
  --color-primary-950: #083344;
}`,

  secondaryColor: `@theme static {
  /* Secondary Color Scale - Autogenerated by NuxtWind Module */
  --color-secondary-50: #ecfdf5;
  --color-secondary-100: #d1fae5;
  --color-secondary-200: #a7f3d0;
  --color-secondary-300: #6ee7b7;
  --color-secondary-400: #34d399;
  --color-secondary-500: #10b981;
  --color-secondary-600: #059669;
  --color-secondary-700: #047857;
  --color-secondary-800: #065f46;
  --color-secondary-900: #064e3b;
  --color-secondary-950: #022c22;
}`,

  // Required keyframes for Progress component
  keyframeIndeterminateSecond: `/* Keyframes for the second indeterminate animation - Autogenerated by NuxtWind Module */
@keyframes indeterminate-second {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}`,

  keyframeIndeterminateFirst: `/* Keyframes for the first indeterminate animation - Autogenerated by NuxtWind Module */
@keyframes indeterminate-first {
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}`,

  // Required utility classes for animations
  utilityIndeterminateBefore: `/* Utility class for the first indeterminate animation used by Progress Component - Autogenerated by NuxtWind Module */
@theme {
  --animate-indeterminatebefore: indeterminate-first 1.5s ease-out infinite;
}`,

  utilityIndeterminateAfter: `/* Utility class for the second indeterminate animation used by Progress Component - Autogenerated by NuxtWind Module */
@theme {
  --animate-indeterminateafter: indeterminate-second 1.5s ease-in infinite;
}`,

  // Complete CSS template
  complete: function (): string {
    return `
${this.tailwindImport}

${this.primaryColor}
${this.secondaryColor}

${this.keyframeIndeterminateFirst}
${this.keyframeIndeterminateSecond}

${this.utilityIndeterminateBefore}
${this.utilityIndeterminateAfter}`
  },
} as const

const patterns = {
  tailwindImport: /@import\s+["']tailwindcss["'](?:\s+source\([^)]*\))?;/,
  primaryColor: /@theme\s+static\s*\{\s*(?:\/\*[\s\S]*?\*\/\s*)*--color-primary-\d{2,3}:\s*#[0-9a-fA-F]{6,8};/,
  secondaryColor: /@theme\s+static\s*\{\s*(?:\/\*[\s\S]*?\*\/\s*)*--color-secondary-\d{2,3}:\s*#[0-9a-fA-F]{6,8};/,
  indeterminateFirstKeyframe: /@keyframes\s+indeterminate-first\s*\{[\s\S]*?\}/,
  indeterminateSecondKeyframe: /@keyframes\s+indeterminate-second\s*\{[\s\S]*?\}/,
  indeterminateBeforeClass: /^\s*--animate-indeterminatebefore:\s*indeterminate-first\s+1\.5s\s+ease-out\s+infinite;\s*$/m,
  indeterminateAfterClass: /^\s*--animate-indeterminateafter:\s*indeterminate-second\s+1\.5s\s+ease-in\s+infinite;\s*$/m,
}

// CSS validation patterns
export const CSS_VALIDATION = {
  patterns: patterns,

  requiredSections: [
    {
      name: 'Tailwind import',
      pattern: patterns.tailwindImport,
      content: CSS_TEMPLATES.tailwindImport,
      position: 'top' as const,
    },
    {
      name: 'Primary color scale',
      pattern: patterns.primaryColor,
      content: CSS_TEMPLATES.primaryColor,
      position: 'middle' as const,
    },
    {
      name: 'Secondary color scale',
      pattern: patterns.secondaryColor,
      content: CSS_TEMPLATES.secondaryColor,
      position: 'middle' as const,
    },
    {
      name: 'indeterminate-first keyframe',
      pattern: patterns.indeterminateFirstKeyframe,
      content: CSS_TEMPLATES.keyframeIndeterminateFirst,
      position: 'bottom' as const,
    },
    {
      name: 'indeterminate-second keyframe',
      pattern: patterns.indeterminateSecondKeyframe,
      content: CSS_TEMPLATES.keyframeIndeterminateSecond,
      position: 'bottom' as const,
    },
    {
      name: 'animate-indeterminatebefore class',
      pattern: patterns.indeterminateBeforeClass,
      content: CSS_TEMPLATES.utilityIndeterminateBefore,
      position: 'bottom' as const,
    },
    {
      name: 'animate-indeterminateafter class',
      pattern: patterns.indeterminateAfterClass,
      content: CSS_TEMPLATES.utilityIndeterminateAfter,
      position: 'bottom' as const,
    },
  ],
} as const
