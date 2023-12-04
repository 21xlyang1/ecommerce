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
        path: 'search',
        components: {
          tow: () => import('@/pages/productSearch.vue')
        }
      },
      {
        path: 'productList',
        components: {
          tow: () => import('@/pages/productList.vue')
        }
      },
      // {
      //   path: 'search',
      //   components: {
      //     tow: () => import('@/pages/search.vue')
      //   }
      // },
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
      {
        path: 'returnCheck',
        components: {
          tow: () => import('@/pages/building.vue')
        }
      },
      {
        path: 'sellerInf',
        components: {
          tow: () => import('@/pages/building.vue')
        }
      },
      {
        path: 'dataStatistics',
        components: {
          tow: () => import('@/pages/building.vue')
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


router.beforeEach((to, from, next) => {
  // 在此处执行一些检查逻辑
  // 比如检查用户是否登录，是否有权限访问目标页面等

  // 如果有权限，调用 next() 进行路由跳转

  console.log(to, from)
  if (to.path == "/ss/favorite" || to.path == "/ss/userOrder" || to.path == "/ss/history") {

    // 使用 $cookies
    const isLoggedIn = router.app.$cookies.get('isLog') == 'true';
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      // 使用 $message
      router.app.$message({
        message: '请先登录或注册',
        type: 'warning',
      });
      router.app.$store.commit("showLogin")

    } else {
      next();
    }
  }else{
    next()
  }



  // 如果没有权限，可以调用 next(false) 取消路由跳转
  // 或者通过 next('/login') 跳转到登录页面等
});













export default router
