import { request } from './request.js'

export const getOrderList = (query, pagenum, pagesize) => request({
  url: '/orders',
  params: {
    query, pagenum, pagesize
  }
})

export const getWuliu = () => request({
  url: '/kuaidi/1106975712662'
})
