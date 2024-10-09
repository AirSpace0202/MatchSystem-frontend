<!-- 修改个人信息页 -->
<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.userName" @click="toEdit('userName', '昵称', user.userName)"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img :height="48" :src="user.avatarUrl" alt="头像" />
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { ref } from "vue";
import {getCurrentUser} from "../services/user.ts";


// const user = {
//   id: 1,
//   username: 'JiXuanZhang',
//   userAccount: 'dogXuan',
//   avatarUrl: "https://tse3.mm.bing.net/th/id/OIP.MEmVm4wGyALRbVNZdc5zDQAAAA?rs=1&pid=ImgDetMain",
//   gender: '男',
//   phone: '3151351341',
//   email: '12333591@qq.com',
//   createTime: new Date(),
// }

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();    // 将获取到的当前用户信息赋值给 user，用于用户信息展示
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<style scoped>

</style>

