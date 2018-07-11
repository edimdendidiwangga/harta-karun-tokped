import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  userRequest: null,
  userSuccess: ['data'],
  userFailure: ['err'],
  addPhotoUserRequest: ['data'],
  addPhotoUserSuccess: ['data'],
  addPhotoUserFailure: ['err'],
})

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  isFetching: false,
  isFound: false,
  isFailure: false,
  message: null,
  code: null
})

/* ------------- Reducers ------------- */

const request = (state) => {
  return state.merge({
    isFetching: true,
    message: null
  })
}

const success = (state, { data }) => {
  return state.merge({
    isFetching: false,
    isFound: true,
    isFailure: false,
    ...data
  })
}

const failure = (state, { err }) => {
  return state.merge({
    isFetching: false,
    isFailure: true,
    ...err
  })
}

const uploadRequest = (state, {data}) => {
  return state.merge({
    isFetching: true,
    message: null
  })
}

const uploadSuccess = (state, { data }) => {
  return state.merge({
    isFetching: false,
    isFound: true,
    isFailure: false,
    ...data
  })
}

const uploadFailure = (state, err) => {
  return state.merge({
    isFetching: false,
    isFailure: true,
    ...err
  })
}
/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [Types.USER_SUCCESS]: success,
  [Types.USER_REQUEST]: request,
  [Types.USER_FAILURE]: failure
})

export const photoUserReducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PHOTO_USER_SUCCESS]: uploadSuccess,
  [Types.ADD_PHOTO_USER_REQUEST]: uploadRequest,
  [Types.ADD_PHOTO_USER_FAILURE]: uploadFailure
})