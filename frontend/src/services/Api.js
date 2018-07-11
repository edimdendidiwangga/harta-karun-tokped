import apisauce from 'apisauce'
const apiURL = process.env.API_URL

const create = (baseURL = apiURL) => {
  const api = apisauce.create({
    baseURL,
    timeout: 10000
  })

  const referer = (ref) => {
    return { headers: {
      referer: ref
    }}
  }

  if (process.env.NODE_ENV !== 'production') {
    const naviMonitor = (response) => console.log('API DEBUG! response =', response.ok)
    api.addMonitor(naviMonitor)
  }

  const listProducts = (data) => api.get(`${baseURL}tokped`, { ...data }, referer(data.referer))
  // const login = (data) => api.post(`${baseURL}users/login`, {...data}, headerNoToken)
  // const logout = (token) => api.post(`${baseURL}users/logout?access_token=${token}`, {}, headerWithToken(token))
  // example with token auth
  // const getUser = (token) => api.get(`${baseURL}users/profile`, {}, headerWithToken(token))
  // const addPhotoUser = (token, data) => api.post(`${baseURL}containers/images/upload`, data, headerFormWithToken(token))
  // const getCategory = () => api.get(`${baseURL}categories`, {}, headerNoToken)

  return {
    listProducts
  }
}

// let's return back our create method as the default.
export default {
  create
}
