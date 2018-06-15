import React, { Component } from 'react'

class GenerateForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fields: {},
    }

    this.renderFields = this.renderFields.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentWillMount() {
    const fields = this.fields.map((field) => {
      const reformatedField = {}
      reformatedField.value = field.value
      return reformatedField
    })
    this.setState({
      fields,
    })
  }

  renderFields(fields) {
    return fields.map((field, index) => {
      switch (field.type) {
      case 'text':
        return (
          <div key={index}>
            <label>{field.title}</label>
            <input type="text" value={this.state.fields[index].value} key={index} onChange={this.onChangeHandler} />
            {field.icon ? 'with icon' : null}
          </div>
        )

      case 'dropdown':
        return (
          <div key={index}>
            <label>{field.title}</label>
            <input type="text" value="dropdown" key={index} />
            {field.icon ? 'with icon' : null}
          </div>
        )


      default:
        break
      }
    })
  }

  onChangeHandler(event) {
    this.setState({
      fields: [...this.state.fields, event.target.value],
    })
    console.log(event)
  }

  fields = [
    {
      title: 'Outcome',
      type: 'dropdown',
      value: 'Drop Down Outcome',
      icon: 'Arrow',
    },
    {
      title: 'Stake',
      type: 'text',
      value: 'Text Stake',
      icon: 'BX',
    },
    {
      title: 'Odd',
      type: 'text',
      value: 'Text Odd',
    },
  ]

  render() {
    return (
      <form>
        {console.log(this.state.fields)}
        {this.renderFields(this.fields)}
      </form>
    )
  }
}

export default GenerateForm
