import countries from './countries'

const returnFlagUrl = (country) => {
  if (countries.hasOwnProperty(country)) {
    return `http://www.countryflags.io/${countries[country]}/flat/64.png`
  }
  return ''
}

export default returnFlagUrl
