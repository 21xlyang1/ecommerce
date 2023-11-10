import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    components: {
      one: () => import('@/pages/test.vue'),
    },
  },
  {
    path: '/',
    redirect: '/ss/home'
  },
  {
    path: '/ls/login',
    components: {
      one: () => import('@/pages/login.vue'),
    },
  },
  {
    path: '/ls/register',
    components: {
      one: () => import('@/pages/register.vue'),
    },
  },
  {
    path: '/ls/sellerRegister',
    components: {
      one: () => import('@/pages/sellerRegister.vue'),
    },
  },
  {
    path: '/ss',
    components: {
      one: () => import('@/pages/shoppingSystem.vue'),
    },
    children: [
      {
        path: 'home',
        components: {
          tow: () => import('@/pages/home.vue')
        }
      },
      {
        path: 'productList',
        components: {
          tow: () => import('@/pages/productList.vue')
        }
      },
      {
        path: 'search',
        components: {
          tow: () => import('@/pages/search.vue')
        }
      },
      {
        path: 'productShow',
        components: {
          tow: () => import('@/pages/productShow.vue')
        }
      },
      {
        path: 'favorite',
        components: {
          tow: () => import('@/pages/favorite.vue')
        }
      },
      {
        path: 'userOrder',
        components: {
          tow: () => import('@/pages/userOrder.vue')
        }
      },
      {
        path: 'logShow',
        components: {
          tow: () => import('@/pages/logShow.vue')
        }
      },
      {
        path: 'history',
        components: {
          tow: () => import('@/pages/history.vue')
        }
      },
    ]
  },
  {
    path: "/ms",
    components: {
      one: () => import('@/pages/sellerSystem.vue'),
    },
    children: [
      {
        path: 'productAdd',
        components: {
          tow: () => import('@/pages/productAdd.vue')
        }
      },
      {
        path: 'productManage',
        components: {
          tow: () => import('@/pages/productManage.vue')
        }
      },
      {
        path: 'inventoryManage',
        components: {
          tow: () => import('@/pages/inventoryManage.vue')
        }
      },
      {
        path: 'sellerOrder',
        components: {
          tow: () => import('@/pages/sellerOrder.vue')
        }
      },

    ]
  },
    {
    path: "/as",
    components: {
      one: () => import('@/pages/adminSystem.vue'),
    },
    children: [
      {
        path: 'dataShow',
        components: {
          tow: () => import('@/pages/dataShow.vue')
        }
      },
      {
        path: 'userManage',
        components: {
          tow: () => import('@/pages/userManage.vue')
        }
      },
      {
        path: 'storeManage',
        components: {
          tow: () => import('@/pages/storeManage.vue')
        }
      },
      {
        path: 'adminOrder',
        components: {
          tow: () => import('@/pages/adminOrder.vue')
        }
      },
      {
        path: 'adminProduct',
        components: {
          tow: () => import('@/pages/adminProduct.vue')
        }
      },
      {
        path: 'commentManage',
        components: {
          tow: () => import('@/pages/commentManage.vue')
        }
      },
      {
        path: 'logManage',
        components: {
          tow: () => import('@/pages/logManage.vue')
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
