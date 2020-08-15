/* eslint-disable camelcase */
import { request } from './request'

export const getcate = (type) => request({
  url: '/categories',
  params: { type }
})

export const getData = (id, sel) => request({
  url: `categories/${id}/attributes`,
  params: { sel }
})

// eslint-disable-next-line camelcase
export const addParams = (id, attr_name, attr_sel) => request({
  url: `categories/${id}/attributes`,
  method: 'post',
  data: {
    attr_name, attr_sel
  }
})

export const queryParamById = (id, attrId, attr_sel) => request({
  url: `categories/${id}/attributes/${attrId}`,
  params: {
    attr_sel

  }
})

export const editParams = (id, attrId, attr_name, attr_sel) => request({
  url: `categories/${id}/attributes/${attrId}`,
  method: 'put',
  data: {
    attr_name, attr_sel

  }
})

export const editParamsList = (id, attrId, attr_name, attr_sel, attr_vals) => request({
  url: `categories/${id}/attributes/${attrId}`,
  method: 'put',
  data: {
    attr_name, attr_sel, attr_vals

  }
})

export const deleteParam = (id, attrid) => request({
  url: `categories/${id}/attributes/${attrid}`,
  method: 'delete'
})
