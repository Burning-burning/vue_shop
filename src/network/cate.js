import { request } from './request'

// eslint-disable-next-line camelcase
export const addcate = (cat_pid, cat_name, cat_level) => request({
  url: '/categories',
  method: 'post',
  data: {
    cat_pid,
    cat_name,
    cat_level
  }
})
