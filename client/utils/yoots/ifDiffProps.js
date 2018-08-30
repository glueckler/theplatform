export const ifDiffProps = (obj, objCheck) => (prop, fn) => {
  if (obj[prop] !== objCheck[prop]) {
    fn()
  }
}
