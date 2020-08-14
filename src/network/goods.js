import { request } from './request'

export const getCategory = (type, pagenum, pagesize) => request({
  url: '/categories',
  params: {
    type, pagenum, pagesize
  }
})

export const getParentCate = (type) => request({
  url: '/categories',
  params: { type }
})
