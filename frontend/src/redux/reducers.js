import { combineReducers } from 'redux'
import auth, { logoutReducer as logout } from './AuthRedux'
import user, { photoUserReducer as photoUser} from './UserRedux'
import { productsReducer as products, productDetailReducer as productDetail, csvReducer as csv, variantReducer as variant } from './Products'

export default combineReducers({
  auth,
  logout,
  user,
  photoUser,
  products,
  productDetail,
  csv,
  variant
})
