import { branch, renderComponent, compose } from 'recompose'

const whileLoading = ({ component = () => null, name = 'data' }) =>
  compose(branch(props => props[name].loading, renderComponent(component)))

export default whileLoading
