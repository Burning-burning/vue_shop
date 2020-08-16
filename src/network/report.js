import { request } from './request.js'

export const getReports = () => request({
  url: 'reports/type/1'
})
