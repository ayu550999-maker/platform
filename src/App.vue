<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { onMounted } from 'vue'
import * as userApi from './api/user/index.ts'
onMounted(() => {
 userApi.reqLogin({ username: 'admin', password: '111111' })
})

</script>
<template>
  <div>
    <div>app根组件</div>
    <svg-icon name="loading"></svg-icon>
  </div>
</template>
<style scoped lang="scss"></style>
