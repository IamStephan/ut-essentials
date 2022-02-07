const Color = require('color')
const { neutral } = require('tailwindcss/colors')

function withOpacity(variableName, defaulVar) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}, ${defaulVar}), ${opacityValue})`
    }
    
    return `rgba(var(${variableName}, ${defaulVar}), 1)`
  }
}

function generateThemableColors(name, colors) {
  let colorMap = {}

  for (const [key, value] of Object.entries(colors)) {
    const [r, g, b] = Color(value).rgb().array()
    colorMap[key] = withOpacity(`--color-${name}-${key}`, `${r}, ${g}, ${b}`)
  }

  return {
    [name]: colorMap,
  }
}

module.exports = {
  theme: {
    extend: {
      colors: {
        ...generateThemableColors('template-primary', neutral),
        ...generateThemableColors('template-secondary', neutral),
        ...generateThemableColors('gray', neutral),
      },
    },
  },
}
