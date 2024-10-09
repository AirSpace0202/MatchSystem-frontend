<!-- 存放通用布局 -->
<template>
<!-- 导航栏样式 -->
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view />
  </div>

  <!-- 底部tabbar 样式 -->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import routes from "../config/route.ts";

const router = useRouter();
const DEFAULT_VALUE = '伙伴匹配';
const title = ref(DEFAULT_VALUE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  if (!route?.title) {
    title.value = DEFAULT_VALUE;
  } else {
    title.value = route.title;
  }
})

const onClickLeft = () => {       // 点击导航条的左侧按键，回到上一个页面
  router.back()
}
const onClickRight = () => {
  router.push('/search')
}


</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>