export default variable => {
  if (typeof variable === 'string' || variable instanceof String) return true
  return false
}
