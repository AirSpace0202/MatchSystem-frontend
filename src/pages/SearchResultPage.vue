<!-- 搜索结果页 -->
<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup >

import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {                               // 参数序列化函数，将请求参数对象序列化为 url 查询字符串格式，indices: false 可以避免使用数组索引
      return qs.stringify(params, { indices: false})
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed', response);
    showSuccessToast('请求成功');
    return response?.data;
  })
  .catch(function (error) {
    console.error('/user/search/tags error', error);
    showFailToast('请求失败');
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);        // 解析为 js 对象，因为后端返回的数据是 json 格式
      }
    })
    userList.value = userListData;          // 赋值给 userList，进行展示
  }
})

// 模拟假数据
// const mockUser = {
//   id: 12341,
//   username: 'AirSpace',
//   userAccount: '123123',
//   avatarUrl: "https://tse3.mm.bing.net/th/id/OIP.MEmVm4wGyALRbVNZdc5zDQAAAA?rs=1&pid=ImgDetMain",
//   profile: "一位成功人士，非常成功的成功小伙，且发量茂盛，颜值极高",
//   gender: 0,
//   phone: 1231231233,
//   email: '123123@qq.com',
//   userRole: 0,
//   tags: ['java', 'c++', 'python'],
//   createTime: new Date(),
// }

</script>

<style scoped>

</style>