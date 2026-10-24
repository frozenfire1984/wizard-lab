import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WizardView from '@/views/wizard/WizardView.vue'
import StepSize from '@/views/wizard/StepSize.vue'
import StepToppings from '@/views/wizard/StepToppings.vue'
import StepDelivery from '@/views/wizard/StepDelivery.vue'
import StepConfirm from '@/views/wizard/StepConfirm.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import { useOrderStore } from '@/stores/order.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: WizardView,
      redirect: { name: 'wizard-size' },
      children: [
        {
          path: 'size',
          name: 'wizard-size',
          component: StepSize,
        },
        {
          path: 'toppings',
          name: 'wizard-toppings',
          component: StepToppings,
          beforeEnter: () => {
            const order = useOrderStore()
            if (!order.size.isDone) {
              return {name: 'wizard-size'}
            }
          }
        },
        {
          path: 'delivery',
          name: 'wizard-delivery',
          component: StepDelivery,
          beforeEnter: () => {
            const order = useOrderStore()
            if (!order.topping.isDone) {
              return {name: 'wizard-toppings'}
            }
          }
        },
        {
          path: 'confirm',
          name: 'wizard-confirm',
          component: StepConfirm,
          beforeEnter: () => {
            const order = useOrderStore()
            if (!order.delivery.isDone) {
              return {name: 'wizard-delivery'}
            }
          }
        },
      ],
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
    },
  ],
})

export default router
