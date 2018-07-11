import React from 'react'
import countries from './countries'

const returnFlagUrl = (country, returnImgTag) => {
  if (countries.hasOwnProperty(country)) {
    if (returnImgTag) {
      return <img src={`http://www.countryflags.io/${countries[country]}/flat/64.png`} />
    }
    return `http://www.countryflags.io/${countries[country]}/flat/64.png`
  }
  return ''
}

export default returnFlagUrl
