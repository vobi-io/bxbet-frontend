import { compose, withProps } from 'recompose'

import load from './load'
import whileLoading from './whileLoading'

// import loadData from './loadData'
// import loadDataAsync from './loadDataAsync'

import meQuery from '../graphql/me.graphql'

// const withMe = (options = { async: false }) => {
//   const hoc = options.async ? loadDataAsync : loadData
//   return hoc({
//     query: meQuery,
//     config: { name: 'me' },
//     name: 'me',
//     shouldErrored: false,
//   })
// }
const withMe = () =>
  compose(
    load({ query: meQuery, name: 'me' }),
    whileLoading({ name: 'me' }),
    withProps(props => ({
      me: props.me.me,
    })),
    // pure,
  )

export default withMe
