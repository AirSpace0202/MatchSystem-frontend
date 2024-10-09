<!-- 个人页 -->
<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.userName" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
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

