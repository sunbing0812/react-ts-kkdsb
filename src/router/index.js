import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home/index'

const Girls=() => import( /* webpackChunkName: "girls" */ '../views/Girls/index.vue')
const Weater=() => import( /* webpackChunkName: "weather" */ '../views/Weather/index.vue')
const News=() => import( /* webpackChunkName: "news" */ '../views/News/index.vue')
const NewsDetail=() => import( /* webpackChunkName: "newsdetail" */ '../views/NewsDetail/index.vue')
const Refuse=() => import( /* webpackChunkName: "refuse" */ '../views/Refuse/index.vue')
const Recommend=() => import( /* webpackChunkName: "recommend" */ '../views/Recommend/index.vue')
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/girls',
    name: 'girls',
    component: Girls
  },
  {
    path: '/weather',
    name: 'weather',
    component: Weater
  },
  {
    path: '/news',
    name: 'news',
    component:News ,
    meta: {
      keepAlive: true //设置页面是否需要使用缓存
    },
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: NewsDetail
  },
  {
    path: '/refuse',
    name: 'refuse',
    component: Refuse
  },
  {
    path: '/test',
    name: 'test',
    component: () => import( /* webpackChunkName: "test" */ '../views/Test/index.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router