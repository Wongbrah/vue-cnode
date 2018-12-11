import axios from 'axios'
import QS from 'qs'

// API接口前缀
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'

// 请求超时时间
axios.defaults.timeout = 10000

// 设置POST请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF'

// GET请求
// @param {String} url [请求的url地址]
// @param {Object} params [请求时携带的参数]
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      if (res.data.success) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err.data)
    })
  })
}

// POST请求
// @param {String} url [请求的url地址]
// @param {Object} params [请求时携带的参数]
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
