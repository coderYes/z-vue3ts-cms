import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import locakCache from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = locakCache.getCache('token')
      // console.log(token)

      if (token && config && config?.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(config) {
      return config
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})
// export const request2 = new Request()
export default request
