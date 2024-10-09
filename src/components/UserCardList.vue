<template>
  <van-skeleton title avatar :row="3" :loading="props.loading"  v-for="user in props.userList" >
    <van-card
        :desc="user.profile"
        :title="user.userName"
        :thumb="user.avatarUrl"
    >
      <template #tags>    <!-- 展示当前用户的所有标签，#tags 代表插槽 -->
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">

import { UserType } from "../models/user";

interface UserCardListProps {         // 定义接口，包含类型为 UserType 数组的 userList 属性
  loading: boolean;
  userList: UserType[];
}
const props = withDefaults(defineProps<UserCardListProps>(), {      // 定于接收来自父组件的 props，默认为空数组
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

</script>

<style scoped>

</style>