<!-- 主页 -->
<template>
  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">

import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios.ts";
import { showFailToast, showSuccessToast } from "vant";
import UserCardList from "../components/UserCardList.vue";

// 有默认模式和匹配模式
const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          showSuccessToast('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match error', error);
          showFailToast('请求失败');
        })
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 20,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);        // 解析为 js 对象，因为后端返回的数据是 json 格式
      }
    })
    userList.value = userListData;          // 赋值给 userList，进行展示
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})


</script>

<style scoped>

</style>