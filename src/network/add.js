import { request } from './request'
export const getCategory = () => request({
  url: '/categories'
})

export const getParam = (id, sel) => request({
  url: `categories/${id}/attributes`,
  params: {
    sel
  }
})

// eslint-disable-next-line camelcase
export const addGoods = (goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, attrs, pics) => request({
  url: '/goods',
  method: 'post',
  data: { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, attrs, pics }
})
