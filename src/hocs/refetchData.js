import emmiter from '../eventEmmiter'

const refetchData = (eventStringName, refetchQuery) => emmiter.addListener(eventStringName, () => {
  refetchQuery.refetch()
})

export default refetchData
