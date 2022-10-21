import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      auth: true,
    },
  },
  // admin
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/data/Upload.vue'),
    meta: {
      auth: true,
      role: 'Admin',
    }
  },
  {
    path: '/viewData',
    name: 'viewData',
    component: () => import('@/views/data/Viewdata.vue'),
    meta: {
      auth: true,
      role: 'Admin',
    }
  },
  {
  path: '/video',
  name: 'Video',
  component: () => import('@/views/data/video.vue'),
  meta: {
    auth: true,
    role: 'Admin',
    }
  },
 
  // common routes
  {
  path: '/VideoPlayer',
  name: 'VideoPlayer',
  component: () => import('@/components/VideoPlayer.vue'),
  meta: {
    auth: true,
    }
  },
   {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
     meta: {
    auth: false,
    }
  },

  // auth routes
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
  {
    path: '/',
    redirect: 'home',
  },
]

const router = new VueRouter({
  //   mode: 'history',
  //   base: process.env.BASE_URL,
  routes,
})

// to remove # sign from the url, uncomment 322 & 323 lines
// check the link https://cli.vuejs.org/guide/deployment.html#docker-nginx to fix docker-nginx file


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: 'pages-login' })
    } else {
      next({ name: 'dashboard' }) // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router
