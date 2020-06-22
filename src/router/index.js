import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register.vue'
import login from '@/views/Login.vue'
import userInfo from '@/views/userInfo'
import edit from '@/views/edit'
import home from '@/views/Home'
import av from '@/views/av'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: home,
    props: true,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    props: true
  },
  {
    path: '/login',
    name: "login",
    component: login,
    props: true
  },
  {
    path: '/userInfo',
    name: "userinfo",
    component: userInfo,
    props: true,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: edit,
    props: true,
    meta: {
      istoken: true
    }
  },

  {
    path: '/av/:id',
    name: 'av',
    component: av,
    props: true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请登录')
    return
  }
  next()


})

export default router