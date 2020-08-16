import { request } from './request.js'

export const getList = (query, pagenum, pagesize) => request({
  url: '/goods',
  params: {
    query, pagenum, pagesize
  }
})

export const deleteThing = (id) => request({
  url: `goods/${id}`,
  method: 'delete'
})
