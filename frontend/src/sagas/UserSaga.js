import {put, call} from 'redux-saga/effects'
import {Types, Creators as Actions} from '../redux/UserRedux'
import { baseListen, baseFetchToken } from './BaseSaga'

export function * getUser (api, getToken) {
  yield baseListen(Types.USER_REQUEST, getUserApi, api, getToken)
}

export function * getUserApi (api, getToken, { data }) {
  yield baseFetchToken(api.getUser, data, getToken, Actions.userSuccess, Actions.userFailure)
}

export function * addPhotoUser (api, getToken) {
  yield baseListen(Types.ADD_PHOTO_USER_REQUEST, addPhotoUserApi, api, getToken)
}

export function * addPhotoUserApi (api, getToken, { data }) {
  yield baseFetchToken(api.addPhotoUser, data, getToken, Actions.addPhotoUserSuccess, Actions.addPhotoUserFailure)
}
