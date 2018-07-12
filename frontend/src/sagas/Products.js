import {put, call} from 'redux-saga/effects'
import {Types, Creators as Actions} from '../redux/Products'
import { baseListen } from './BaseSaga'

export function * products (api) {
  yield baseListen(Types.PRODUCTS_REQUEST, productsApi, api)
}

export function * productsApi (api, { data }) {
  const res = yield call(api.products, data)
  if (!res.ok) {
    yield put(Actions.productsFailure(res.data))
  } else {
    yield put(Actions.productsSuccess(res.data))
  }
}

export function * productDetail (api) {
  yield baseListen(Types.PRODUCT_DETAIL_REQUEST, productDetailApi, api)
}

export function * productDetailApi (api, { data }) {
  const res = yield call(api.productDetail, data)
  if (!res.ok) {
    yield put(Actions.productDetailFailure(res.data))
  } else {
    yield put(Actions.productDetailSuccess(res.data))
  }
}
