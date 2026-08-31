<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 -->
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click = "login" >
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
import { reactive , ref} from 'vue'
import useUserStore from '@/store/modules/user'
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";


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

// 登录的函数
const login = async () => {
  try {
    loading.value = true
    await userStore.userlogin(loginForm)
    $router.push('/')
  } catch (error){
    ElNotification({
      title: '登录失败',
      message: error as string,
      type: 'error',
    })
  }finally {
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
