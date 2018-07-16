const cacheListRemove = ({ client, name, listQuery, listVars, record }) => {
  const cacheSelector = {
    query: listQuery,
    variables: listVars,
  }
  const cachePortion = client.readQuery(cacheSelector)

  const ommittedRemoved = cachePortion[name].filter(
    v => v._id !== record.recordId,
  )

  client.writeQuery(
    Object.assign({}, cacheSelector, {
      data: {
        [name]: ommittedRemoved,
      },
    }),
  )
}

export default cacheListRemove
