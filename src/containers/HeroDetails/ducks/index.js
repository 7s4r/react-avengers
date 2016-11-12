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

export const loadHero = () => {
  return (dispatch) => {
    return getHeroDetails()
      .then((response) => {
        return dispatch(receiveSuccess(response.results))
      })
      .catch((error) => {
        return dispatch(receiveError(error))
      })
  }
}

/*
 Reducer
 */
const initialState = fromJS([
  {
    id: 0,
    name: null,
    thumbnail: null
  }
])

const transform = (hero, state) => {
  let i
  let current

  for (i = 0; i < hero.length; i += 1) {
    current = hero[i]
    state = state.setIn([i, 'id'], current['@id'])
    state = state.setIn([i, 'name'], current.name)
    state = state.setIn([i, 'thumbnail'], current.thumbail.path + current.thumbail.extension)
    state = state.setIn([i, 'description'], current.description)
  }

  return state
}

export default function heroReducer(state = initialState, action) {
  switch (action.type) {
    case HERO_RECEIVE:
      return transform(action.hero, initialState)
    default:
      return state
  }
}
