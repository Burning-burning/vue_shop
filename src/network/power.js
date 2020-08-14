import { request } from './request'

export const getRights = () => request({
  url: 'rights/list'
})

export const getRoles = () => request({
  url: '/roles'
})

export const deleteRights = (roleId, rightId) => request({
  url: `roles/${roleId}/rights/${rightId}`,
  method: 'delete'
})

export const getAllRights = () => request({
  url: 'rights/tree'
})

export const allotRights = (roleId, rids) => request({
  url: `roles/${roleId}/rights`,
  method: 'post',
  data: { rids }
})
