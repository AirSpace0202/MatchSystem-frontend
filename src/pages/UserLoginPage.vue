<!-- 用户登录界面 -->
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { ref } from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();   // 控制路由跳转
const route = useRoute();     // 获取页面信息

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res.data) {
    showSuccessToast('登录成功');
    const redirectUrl = route.query?.redirect as string ?? '/';
   window.location.href = redirectUrl;                // 登录成功后跳转至原界面
  } else {
    showFailToast('登录失败');
  }
};

</script>

<style scoped>

</style>

