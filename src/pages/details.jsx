import React from 'react'
import HeroDetails from '../containers/HeroDetails'

const Details = ({ params: { heroId } }) => {
  return (
    <div>
      <HeroDetails heroId={parseInt(heroId, 10)} />
    </div>
  )
}

Details.propTypes = {
  params: React.PropTypes.shape({
    heroId: React.PropTypes.string
  })
}

export default Details
