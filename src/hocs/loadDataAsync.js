import { compose } from 'recompose'

import load from './load'

const loadDataAsync = ({ query, config }) =>
  compose(
    load({ query, config }),
    // pure,
  )

export default loadDataAsync
