import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import HomeView from '../views/HomeView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ShopView from '@/views/ShopView.vue'
import ShopSouvenirsView from '@/views/shop/ShopSouvenirsView.vue'
import ShopGiftsView from '@/views/shop/ShopGiftsView.vue'
import ShopDefaultView from '@/views/shop/ShopDefaultView.vue'
import UsersView from '@/views/UsersView.vue'
import UserDetailsView from '@/views/UserDetailsView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/shop',
      component: ShopView,
      children: [
        {
          path: '',
          name: 'shop',
          component: ShopDefaultView,
        },
        {
          path: 'souvenirs',
          name: 'souvenirs',
          component: ShopSouvenirsView,
        },
        {
          path: 'gifts',
          name: 'gifts',
          component: ShopGiftsView,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ],
})

export const isRouteLoading = ref(false)

router.beforeEach((to, from) => {
  const isAuthenticated: boolean = false;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath }
    }
  }

  isRouteLoading.value = true
})

router.afterEach(() => {
  isRouteLoading.value = false
})

router.onError(() => {
  isRouteLoading.value = false
})

export default router
