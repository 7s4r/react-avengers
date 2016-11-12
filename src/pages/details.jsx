import React from 'react'
import HeroDetails from '../containers/HeroDetails'

const Details = (props) => {
  return (
    <div>
      <h1>Détails sur :</h1>
      <HeroDetails id={props.id} />
    </div>
  )
}

Details.propTypes = {
  id: React.PropTypes.number
}

export default Details
