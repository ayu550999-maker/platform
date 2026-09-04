import { defineStore } from 'pinia'
import * as userAPI from '@/api/user'
import type { loginFormData } from '@/api/user/type.ts'

let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '', // 用户的token
    }
  },
  // 处理业务逻辑
  actions: {
    // 用户登录
    async userlogin(data: loginFormData) {
      const res = await userAPI.reqLogin(data)
      if (res.code === 200) {
        this.token = res.data
        localStorage.setItem('token', res.data)
        return res.message
      } else {
        throw res.message // 抛出错误
      }
    },
  },
  getters: {},
})
export default useUserStore
