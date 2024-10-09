import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import EditUser from "../pages/EditUser.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";

const routes = [
    { path: '/', title: "主页", component: Index },
    { path: '/team',  title: "队伍", component: Team },
    { path: '/user', title: "个人", component: User},
    { path: '/search', title: "查询", component: Search},
    { path: '/user/edit/', title: "编辑信息", component: EditUser},
    { path: '/user/list/', title: "用户列表", component: SearchResultPage},
    { path: '/user/login', title: "登录", component: UserLoginPage },
    { path: '/team/add', title: "创建队伍", component: TeamAddPage },
    { path: '/team/update', title: "更新队伍", component: TeamUpdatePage },
    { path: '/user/update', title: "我的信息", component: UserUpdatePage },
    { path: '/user/team/join', title: "我加入的队伍", component: UserTeamJoinPage },
    { path: '/user/team/create', title: "我创建的队伍", component: UserTeamCreatePage },
]

export default routes;