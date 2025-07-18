export const CSS_TEMPLATES = {
  // Main Tailwind import
  tailwindImport: '@import "tailwindcss";',

  // Required keyframes for Progress component
  keyframeIndeterminateSecond: `@keyframes indeterminate-second {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}`,

  keyframeIndeterminateFirst: `@keyframes indeterminate-first {
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
  utilityIndeterminateBefore: `@layer utilities {
  .animate-indeterminatebefore {
    animation: indeterminate-first 1.5s ease-out infinite;
  }
}`,

  utilityIndeterminateAfter: `@layer utilities {
  .animate-indeterminateafter {
    animation: indeterminate-second 1.5s ease-in infinite;
  }
}`,

  // Complete CSS template
  complete: function (): string {
    return `
${this.tailwindImport}

${this.keyframeIndeterminateFirst}
${this.keyframeIndeterminateSecond}

${this.utilityIndeterminateBefore}
${this.utilityIndeterminateAfter}`
  },
} as const

// CSS validation patterns
export const CSS_VALIDATION = {
  patterns: {
    tailwindImport: /@import\s+["']tailwindcss["']/,
    indeterminateFirstKeyframe: /@keyframes\s+indeterminate-first/,
    indeterminateSecondKeyframe: /@keyframes\s+indeterminate-second/,
    indeterminateBeforeClass: /\.animate-indeterminatebefore/,
    indeterminateAfterClass: /\.animate-indeterminateafter/,
  },

  requiredSections: [
    {
      name: 'Tailwind import',
      pattern: /@import\s+["']tailwindcss["']/,
      content: CSS_TEMPLATES.tailwindImport,
      position: 'top' as const,
    },
    {
      name: 'indeterminate-first keyframe',
      pattern: /@keyframes\s+indeterminate-first/,
      content: CSS_TEMPLATES.keyframeIndeterminateFirst,
      position: 'middle' as const,
    },
    {
      name: 'indeterminate-second keyframe',
      pattern: /@keyframes\s+indeterminate-second/,
      content: CSS_TEMPLATES.keyframeIndeterminateSecond,
      position: 'middle' as const,
    },
    {
      name: 'animate-indeterminatebefore class',
      pattern: /\.animate-indeterminatebefore/,
      content: CSS_TEMPLATES.utilityIndeterminateBefore,
      position: 'bottom' as const,
    },
    {
      name: 'animate-indeterminateafter class',
      pattern: /\.animate-indeterminateafter/,
      content: CSS_TEMPLATES.utilityIndeterminateAfter,
      position: 'bottom' as const,
    },
  ],
} as const
