import {put, call} from 'redux-saga/effects'
// import {END} from 'redux-saga'
import {Types as AuthTypes, Creators as AuthActions} from '../redux/AuthRedux'
import Cookies from 'universal-cookie'
// import validate from '../config/Validator'
// import AuthValidator from '../validations/Auth'
import { baseListen, baseFetchLogout } from './BaseSaga'
const cookies = new Cookies()

// attempts to login
export function * login (api) {
  yield baseListen(AuthTypes.AUTH_REQUEST,
    fetchLoginAPI,
    api)
}

export function * fetchLoginAPI (api, { data }) {
  const res = yield call(api.login, data)
  if (!res.ok) {
    yield put(AuthActions.authFailure(res.data.error))
  }
  if (!res.data.error) {
    yield cookies.set('access_token', `${res.data.data.token}`, { path: '/' })
    yield put(AuthActions.authSuccess(res.data))
  } else {
    yield put(AuthActions.authFailure(res.data.error))
  }
}

export function * logout (api, getToken) {
  yield baseListen(AuthTypes.AUTH_LOGOUT_REQUEST, api, getToken)
}
