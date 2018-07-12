import apisauce from 'apisauce'
const apiURL = process.env.API_URL

const create = (baseURL = apiURL) => {
  const api = apisauce.create({
    baseURL,
    timeout: 960000 // 16 menit
  })

  const referer = (referer) => {
    return {
      headers: {
        referer
      }
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const naviMonitor = (response) => console.log('API DEBUG! response =', response.ok)
    api.addMonitor(naviMonitor)
  }

  const products = (data) => api.get(`${baseURL}tokped`, { ...data }, referer(data.referer))
  const productDetail = (data) => api.get(`${baseURL}tokped/detail`, { ...data })
  // const login = (data) => api.post(`${baseURL}users/login`, {...data}, headerNoToken)
  // const logout = (token) => api.post(`${baseURL}users/logout?access_token=${token}`, {}, headerWithToken(token))
  // example with token auth
  // const getUser = (token) => api.get(`${baseURL}users/profile`, {}, headerWithToken(token))
  // const addPhotoUser = (token, data) => api.post(`${baseURL}containers/images/upload`, data, headerFormWithToken(token))
  // const getCategory = () => api.get(`${baseURL}categories`, {}, headerNoToken)

  return {
    products,
    productDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}
