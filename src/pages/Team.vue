<!-- 队伍页面组件 -->
<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <van-button type="primary" @click="doJoinTeam" class="add-button">新建</van-button>
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

// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const active = ref('public')
const teamList = ref([]);
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  if (name === 'public') {
    // 查公开
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

/**
 * 展示队伍列表
 * @param val 搜索条件
 * @param status 队伍状态
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
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