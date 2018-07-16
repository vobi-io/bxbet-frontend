const cacheListUpdate = ({
  client,
  name,
  countName,
  listQuery,
  listVars,
  newRecord,
}) => {
  const cacheSelector = {
    query: listQuery,
    variables: listVars,
  }
  const cachePortion = client.readQuery(cacheSelector)

  cachePortion[name].push(newRecord)
  cachePortion[countName] += 1

  client.writeQuery(
    Object.assign({}, cacheSelector, {
      data: cachePortion,
    }),
  )
}

export default cacheListUpdate
