import { request } from './request'

export const getMenu = () => request({ url: '/menus' })
