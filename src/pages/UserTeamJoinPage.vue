<!-- 加入的队伍页面组件 -->
<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
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

const teamList = ref([]);
const searchText = ref('');

/**
 * 搜索已加入的队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
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