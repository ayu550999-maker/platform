<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { onMounted } from 'vue'
import * as userApi from './api/user/index.ts'
onMounted(() => {
  userApi.reqLogin({ username: 'admin', password: '111111' })
})
</script>
<template>
  <router-view />
</template>
<style scoped lang="scss"></style>
