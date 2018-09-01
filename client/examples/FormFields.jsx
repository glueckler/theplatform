            {/* Form Fields */}
            {/* -   -   -   -   -   - */}
            <form>
              <Radios
                defaultValue="radio"
                onChange={e => {
                  alert(e.target.value)
                  this.setState({
                    radiosVal: e.target.value,
                  })
                }}
                value={this.state.radiosVal}
                label="these radios"
              >
                <RadioOption
                  label="this is a label"
                  value="radio2"
                />
                <RadioOption
                  label="this is another label"
                  value="radio"
                />
              </Radios>
              <AddField
                onClick={e => {
                  this.handleOpenAddFieldModal()
                }}
              >
                <Text
                  zeroMargin
                  variant="p3"
                  style={{ position: 'absolute', top: '8px' }}
                >
                  Add form field
                </Text>
              </AddField>
              <Checkboxes
                onChange={(e, checked) => {
                  alert(e.target.value)
                  if (!checked) {
                    this.setState({
                      checkVal: (this.state.checkVal || []).concat([
                        e.target.value,
                      ]),
                    })
                  } else {
                    this.setState({
                      checkVal: this.state.checkVal.filter(val => {
                        return val !== e.target.value
                      }),
                    })
                  }
                }}
                values={this.state.checkVal}
                label="checkbox label"
              >
                <Checkbox label="my first checkbox" value="check1" />
                <Checkbox label="my second checkbox" value="check2" />
              </Checkboxes>
              <TextInput
                onChange={e => {
                  this.setState({
                    TIVal: e.target.value,
                  })
                }}
                value={this.state.TIVal}
                placeholder="some placeholder"
                label="Text Input"
                helperText="helper text"
              />
              <TextArea
                onChange={e => {
                  this.setState({
                    TAVal: e.target.value,
                  })
                }}
                value={this.state.TAVal}
                placeholder="some textarea placeholder"
                label="TextArea"
                helperText="ta helper text"
              />
              <Select
                onChange={e => {
                  this.setState({
                    selectVal: e.target.value,
                  })
                }}
                value={this.state.selectVal}
                defaultValue="2"
                label="Select Label"
              >
                <SelectOption value="1">chicken</SelectOption>
                <SelectOption value="2">liver</SelectOption>
                <SelectOption value="3">oil</SelectOption>
              </Select>
              {/* Add Field */}
              {/* -   -   -   -   -   - */}
              <AddField
                open
                onClick={e => {
                  this.handleOpenAddFieldModal()
                }}
              >
                <Text
                  zeroMargin
                  variant="p3"
                  style={{ position: 'absolute', top: '8px' }}
                >
                  Add form field
                </Text>
              </AddField>
            </form>