import React from 'react'
import countries from './countries'

const returnFlagUrl = (country, returnImgTag) => {
  if (country === 'Draw') {
    return (
      <div
        style={{
          width: '32px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          color: 'black',
        }}
        className="flag"
      >
        X
      </div>
    )
  }
  if (countries.hasOwnProperty(country)) {
    if (returnImgTag) {
      return <img className="flag" src={`http://www.countryflags.io/${countries[country]}/flat/64.png`} />
    }
  }
}

export default returnFlagUrl
