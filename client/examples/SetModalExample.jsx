this.props.setModal({
  header: <>Choose Custom Form Field</>,
  open: true,
  content: <FieldSelector onChange={this.handleAddFieldSelectorOnChange} />,
  buttons: (
    <>
      <Button
        disabled={!this.isAddFieldSaveEnabled()}
        onClick={this.handleAddFieldSave}
      >
        save
      </Button>
    </>
  ),
})