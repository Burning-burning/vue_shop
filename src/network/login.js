import { request } from './request.js'

export const login = (username, password) => request({
  url: 'login',
  method: 'post',
  data: {
    username,
    password
  }
})
