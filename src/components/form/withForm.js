/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import Form from './Form'

const withForm = baseProps => (BaseComponent) => {
  class WithForm extends Component {
    render() {
      if (!this.props.submitHandler) {
        console.error('submitHandler is required')
      }
      return (
        <Form {...baseProps} submitHandler={this.props.submitHandler}>
          {props => <BaseComponent {...props} {...this.props} />}
        </Form>
      )
    }
  }

  return WithForm
}

export default withForm
