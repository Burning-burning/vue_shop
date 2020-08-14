import { request } from './request'

export const getUsers = (query, pagenum, pagesize) => request({ url: '/users', params: { query, pagenum, pagesize } })

export const updateUserStatus = (uid, type) => request({
  method: 'put',
  url: `users/${uid}/state/${type}`
})

export const addUsers = (username, password, email, mobile) => request({
  url: '/users',
  method: 'post',
  data: {
    username, password, email, mobile
  }
})

export const updateUser = (id, email, mobile) => request({
  url: `users/${id}`,
  method: 'put',
  data: {
    email, mobile
  }

})

export const getUserById = (id) => request({
  url: `users/${id}`
})

export const deleteUser = (id) => request({
  url: `users/${id}`,
  method: 'delete'
})
export const allotUserRole = (id, rid) => request({
  url: `users/${id}/role`,
  method: 'put',
  data: { rid }
})
