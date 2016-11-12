import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import HeroesReducer from '../containers/Heroes/ducks'
import HeroDetailsReducer from '../containers/HeroDetails/ducks'

export default combineReducers({
  heroes: HeroesReducer,
  hero: HeroDetailsReducer,
  routing: routerReducer
})
