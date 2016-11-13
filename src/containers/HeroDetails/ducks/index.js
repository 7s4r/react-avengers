import { fromJS } from 'immutable'
import { getHeroDetails } from '../../../utils/api'

/*
 Const
 */
const HERO_RECEIVE = 'HERO_RECEIVE'
const HERO_ERROR = 'HERO_ERROR'

/*
 Actions
 */
const receiveSuccess = (hero) => {
  return {
    type: HERO_RECEIVE,
    hero
  }
}

const receiveError = (error) => {
  return {
    type: HERO_ERROR,
    error
  }
}

export const loadHero = (heroId) => {
  return (dispatch) => {
    return getHeroDetails(heroId)
      .then((response) => {
        return dispatch(receiveSuccess(response.data.results[0]))
      })
      .catch((error) => {
        return dispatch(receiveError(error))
      })
  }
}

/*
 Reducer
 */
const initialState = fromJS({
  id: 0,
  name: null,
  thumbnail: null,
  description: null,
  series: null,
  comics: null,
})

const transform = (hero, state) => {
  state = state.set('id', hero.id)
  state = state.set('name', hero.name)
  state = state.set('thumbnail', `${hero.thumbnail.path}.${hero.thumbnail.extension}`)
  state = state.set('description', hero.description)
  state = state.set('series', hero.series.items)
  state = state.set('comics', hero.comics.items)

  return state
}

export default function heroReducer(state = initialState, action) {
  switch (action.type) {
    case HERO_RECEIVE:
      return transform(action.hero, state)
    default:
      return initialState
  }
}
