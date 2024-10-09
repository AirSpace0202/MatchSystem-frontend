<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="ojlogo"
        :desc="team.description"
        :title="team.name"
    >
      <template #tags>    <!-- 展示当前用户的所有标签，#tags 代表插槽 -->
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数: ${team.hasJoinNum} / ${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{'过期时间：' + team.expireTime}}
        </div>
        <div>
          {{'创建时间：' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    plain @click="preJoinTeam(team)">
          加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password"  placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">

import { TeamType } from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import ojlogo from "../assets/ojlogo.svg";
import MyAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserState} from "../states/user.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";

interface TeamCardListProps {         // 定义接口，包含类型为 TeamType 数组的 teamList 属性
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {      // 定于接收来自父组件的 props，默认为空数组
  // @ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const currentUser = getCurrentUserState();
const router = useRouter();

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return ;
  }
  const res = await MyAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `, ${res.description}` : ''));
  }
}

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }}


const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 跳转至更新队伍页
 * @param id 队伍 id
 */
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id 队伍 id
 */
const doQuitTeam = async (id: number) => {
  const res = await MyAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `, ${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id 队伍 id
 */
const doDeleteTeam = async (id: number) => {
  const res = await MyAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `, ${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>