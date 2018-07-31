/* eslint-disable no-console */
export const pick = (source, include) => {
  if (!Array.isArray(include)) {
    console.error(
      `Warning: Attempting to use pro with type ${typeof include}, instead of an Array`
    )
    return null
  }
  return include.reduce((col, key) => {
    if ([null, undefined].includes(source[key])) return col
    return { ...col, [key]: source[key] }
  }, {})
}
