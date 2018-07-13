import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  productsRequest: ['data'],
  productsSuccess: ['data'],
  productsFailure: ['err'],
  productDetailRequest: ['data'],
  productDetailSuccess: ['data'],
  productDetailFailure: ['err'],
  csvRequest: ['data'],
  csvSuccess: ['data'],
  csvFailure: ['err']
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
    isFound: false,
    isFailure: false,
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
    isFound: false,
    isFailure: true,
    ...err
  })
}

/* ------------- Hookup Reducers To Types ------------- */
export const productsReducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCTS_SUCCESS]: success,
  [Types.PRODUCTS_REQUEST]: request,
  [Types.PRODUCTS_FAILURE]: failure
})

export const productDetailReducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_DETAIL_SUCCESS]: success,
  [Types.PRODUCT_DETAIL_REQUEST]: request,
  [Types.PRODUCT_DETAIL_FAILURE]: failure
})

export const csvReducer = createReducer(INITIAL_STATE, {
  [Types.CSV_SUCCESS]: success,
  [Types.CSV_REQUEST]: request,
  [Types.CSV_FAILURE]: failure
})
