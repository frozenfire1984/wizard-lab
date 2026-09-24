import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ShopView from '@/views/ShopView.vue'
import ShopSouvenirsView from '@/views/shop/ShopSouvenirsView.vue'
import ShopGiftsView from '@/views/shop/ShopGiftsView.vue'
import ShopDefaultView from '@/views/shop/ShopDefaultView.vue'
import UsersView from '@/views/UsersView.vue'
import UserDetailsView from '@/views/UserDetailsView.vue'

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
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserDetailsView
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
  ],
})

export default router
