import emmiter from '../eventEmitter'

const refetchData = (eventStringName, refetchQuery) => emmiter.addListener(eventStringName, () => {
  refetchQuery.refetch()
})

export default refetchData
