import * as fs from 'fs'

export type ColorsProps = {
  variablesPrefix?: string
  globalsCssPath?: string
  primaryColors?: Record<string, string>
}

/**
 * Get the colors from the globals.css file
 * and return an object with the complete colors
 * @param {string} variablesPrefix - The prefix of the css variables
 * @param {string} globalsCssPath - The path of the globals.css file
 * @param {Record<string, string>} primaryColors - The primary colors
 * @returns {Record<string, string>} - The colors
 */
export const colors = ({
  variablesPrefix = 'color',
  globalsCssPath = './src/app/globals.css',
  primaryColors = {
    transparent: 'transparent',
  },
}: ColorsProps = {}) => {
  // Get the content of the globals.css file
  const globalsCssContent = fs.readFileSync(globalsCssPath, 'utf8').toString()

  // Get the colors from the globals.css file
  const cssColorsNames = globalsCssContent
    .match(new RegExp(`--${variablesPrefix}-[a-zA-Z0-9-]+`, 'g'))
    ?.map((color) => {
      return color.replace(`--${variablesPrefix}-`, '')
    })

  // Create a function that returns the color with opacity
  const withOpacity = (colorVariableName: string) => {
    return `rgb(from var(--${variablesPrefix}-${colorVariableName}) r g b / <alpha-value>)`
  }

  // Return the colors with the opacity function
  return cssColorsNames?.reduce((acc, color) => {
    return {
      ...acc,
      [color]: withOpacity(color),
    }
  }, primaryColors)
}
