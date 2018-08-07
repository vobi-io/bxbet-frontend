import { branch, renderComponent, compose } from 'recompose'

const onError = ({ component = () => null, name = 'data' }) =>
  compose(
    // withProps(() => console.log('in errors: ', name)),
    branch(props => props[name].error, renderComponent(component)),
  )

export default onError
