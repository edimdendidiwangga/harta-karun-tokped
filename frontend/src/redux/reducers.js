import { combineReducers } from 'redux'
import auth, { logoutReducer as logout } from './AuthRedux'
import user, { photoUserReducer as photoUser} from './UserRedux'
import { productsReducer as products, productDetailReducer as productDetail } from './Products'

export default combineReducers({
  auth,
  logout,
  user,
  photoUser,
  products,
  productDetail
})
