import { fork, all } from 'redux-saga/effects'
import { login, logout } from './AuthSaga'
import { getUser, addPhotoUser } from './UserSaga'
import { products, productDetail, csv } from './Products'
import API from '../services/Api'
import getToken from '../services/GetToken'
const api = API.create()

export default function * rootSaga () {
  yield all([
    fork(logout, api, getToken),
    fork(login, api),
    fork(getUser, api, getToken),
    fork(addPhotoUser, api, getToken),
    fork(products, api),
    fork(productDetail, api),
    fork(csv, api)
  ])
}
