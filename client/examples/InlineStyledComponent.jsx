
        {/*   *   *   *   */}
        {/* Preview */}
        {(() => {
          if (!S.Preview) {
            S.Preview = styled.div`
              margin-top: 50px;
              border-top: 1px solid #afafaf;
            `
          }
          return (
            <S.Preview>
              <Text variant="h3">Preview..</Text>
              <div style={{ minHeight: '90px' }}>
                <FormField
                  field={{
                    inputType:
                      this.state.inputType || this.state.inputTypePreview,
                    ...this.state.fieldMetadata,
                  }}
                />
              </div>
            </S.Preview>
          )
        })()}