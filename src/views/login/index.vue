<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 -->
        <el-form class="login_form" ref="loginForms" :model="loginForm" :rules="loginRules">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'

// 加载状态
const loading = ref(false)

//获取路由器
let $router = useRouter()
// 使用用户信息的小仓库
const userStore = useUserStore()
// 登录的表单数据
const loginForm = reactive({
  username: '',
  password: '',
})
// 登录的表单数据验证规则
const loginForms = ref()


// 登录的表单规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'change' },
  ],
}

// 登录的函数
const login = async () => {
  // 表单校验
  try {
    await loginForms.value.validate()
  } catch (error: any) {
    const errors = error as Record<
        string,
        { message: string; field: string }[]
    >
    const message = Object.values(errors)[0]?.[0]?.message || '请检查表单信息'

    ElNotification({
      title: '表单校验失败',
      message: String(message),
      type: 'error',
    })

    return
  }

  try {
    loading.value = true

    await userStore.userlogin(loginForm)

    $router.push('/')

    ElNotification({
      title: getTime() + '好',
      message: '欢迎来到硅谷甄选',
      type: 'success',
    })
  } catch (error: any) {
    ElNotification({
      title: '登录失败',
      message: error?.message || '用户名或密码错误',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
