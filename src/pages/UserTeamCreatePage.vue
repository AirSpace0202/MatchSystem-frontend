<!-- 创建的队伍页面 -->
<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <TeamCardList :teamList="teamList"/>
    <van-empty v-if="!teamList || teamList.length < 1" description="数据为空" />
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {onMounted, ref} from "vue";
import {showFailToast} from "vant";

const router = useRouter()

// 跳转到创建队伍页
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const teamList = ref([]);
const searchText = ref('');

const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请重试！');
  }
};

// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

// 根据搜索框值进行搜索
const onSearch = (val) => {
  listTeam(val);
}


</script>

<style scoped>

</style>