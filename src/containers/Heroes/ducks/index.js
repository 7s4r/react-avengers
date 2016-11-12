import { fromJS } from 'immutable'
import { getHeroes } from '../../../utils/api'

/*
 Const
 */
const HEROES_RECEIVE = 'HEROES_RECEIVE'
const HEROES_ERROR = 'HEROES_ERROR'

/*
 Actions
 */
const receiveSuccess = (heroes) => {
  return {
    type: HEROES_RECEIVE,
    heroes
  }
}

const receiveError = (error) => {
  return {
    type: HEROES_ERROR,
    error
  }
}

export const loadHeroes = () => {
  return (dispatch) => {
    return getHeroes()
      .then((response) => {
        return dispatch(receiveSuccess(response.data.results))
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

const transform = (heroes, state) => {
  let i
  let current

  for (i = 0; i < heroes.length; i += 1) {
    current = heroes[i]
    state = state.setIn([i, 'id'], current['@id'])
    state = state.setIn([i, 'name'], current.name)
    state = state.setIn([i, 'thumbnail'], current.thumbail.path + current.thumbail.extension)
  }

  return state
}

export default function heroesReducer(state = initialState, action) {
  switch (action.type) {
    case HEROES_RECEIVE:
      return transform(action.heroes, initialState)
    default:
      return state
  }
}
