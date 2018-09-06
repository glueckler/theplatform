const ifDiff = ifDiffProps(prevProps.el, this.props.el)
ifDiff('selectedFormId', () => {
  this.freshFormFields()
})