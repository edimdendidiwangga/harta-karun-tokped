import { combineReducers } from 'redux'
import auth, { logoutReducer as logout } from './AuthRedux'
import user, { photoUserReducer as photoUser} from './UserRedux'
import categories from './Categories'

export default combineReducers({
  auth,
  logout,
  user,
  photoUser,
  categories
})
