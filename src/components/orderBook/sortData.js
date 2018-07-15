const sortData = (data) => {
  const buy = []
  const sell = []

  data.map((item) => {
    if (item.orderType === 0) {
      buy.push([item.odd, item.amount])
    } else {
      sell.push([item.odd, item.amount])
    }
  })

  return { buy, sell }
}

export default sortData
