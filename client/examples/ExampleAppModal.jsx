
  handleAddFieldSelector(node) {
    this.props.setModal({
      header: <>Change Form Name</>,
      open: true,
      onCancel: () => {
        alert('and do this too')
      },
      content: node,
      buttons: (
        <>
          <Button onClick={this.handle}>save</Button>
        </>
      ),
    })
  }