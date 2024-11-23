# @antoineguglielmi/tw-colors

A color manager for TailwindCSS.

## Installation

Install the package using npm:

```bash
npm install @antoineguglielmi/tw-colors
```

## Usage

In your `globals.css` file, declare your color css variables:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-white: #f9f9f9;
    --color-black: #1a1a1a;
  }
}
```

Import the colors function and use it to get the colors from your `globals.css` file:

```typescript
import { colors } from '@antoineguglielmi/tw-colors'

const colorConfig = colors({
  variablesPrefix: 'color',
  globalsCssPath: './src/app/globals.css',
  primaryColors: { transparent: 'transparent' },
})

export default {
  theme: {
    extend: {
      colors: colorConfig,
    },
  },
} satisfies Config
```

## Options

The `colors` function accepts an object with the following properties:

- `variablesPrefix (string)`: The prefix of the CSS variables. Default is `'color'`.
- `globalsCssPath (string)`: The path of the `globals.css` file. Default is `'./src/app/globals.css'`.
- `primaryColors (Record<string, string>)`: The primary colors. Default is `{ transparent: 'transparent' }`.
