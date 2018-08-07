import { compose } from 'recompose'

import load from './load'
import whileLoading from './whileLoading'

const loadData = ({ query, config, name = 'data' }) =>
  compose(
    load({ query, config, name }),
    whileLoading({ name }),
  )

export default loadData
