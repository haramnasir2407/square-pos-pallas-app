import { createPreset } from '@pallas-ui/panda-preset'
import { presetPrimaryColors } from '@pallas-ui/panda-preset/colors/paletteGenerator'
import type { ThemeColorPalette } from '@pallas-ui/panda-preset/types'
import { defineConfig } from '@pandacss/dev'

const themeColorPalette: ThemeColorPalette = {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  primary: { colorName: 'blue', colorValue: presetPrimaryColors['blue']! },
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  error: { colorName: 'red', colorValue: presetPrimaryColors['red']! },
  success: {
    colorName: 'green',
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors['green']!,
  },
  warning: {
    colorName: 'yellow',
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors['yellow']!,
  },
  info: {
    colorName: 'blue',
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    colorValue: presetPrimaryColors['blue']!,
  },
}
export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: [
    createPreset({
      colors: themeColorPalette,
      baseRadius: 2,
    }),
  ],

  // Where to look for your css declarations
  include: ['./src/components/**/*.{ts,tsx,js,jsx}', './src/app/**/*.{ts,tsx,js,jsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
  jsxFramework: 'react',
  jsxStyleProps: 'minimal',
})
