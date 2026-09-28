import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WizardView from '@/views/wizard/WizardView.vue'
import StepSize from '@/views/wizard/StepSize.vue'
import StepToppings from '@/views/wizard/StepToppings.vue'
import StepDelivery from '@/views/wizard/StepDelivery.vue'
import StepConfirm from '@/views/wizard/StepConfirm.vue'

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
      redirect: { name: 'wizard-size'},
      children: [
        {
          path: 'size',
          name: 'wizard-size',
          component: StepSize
        },
        {
          path: 'toppings',
          name: 'wizard-toppings',
          component: StepToppings
        },
        {
          path: 'delivery',
          name: 'wizard-delivery',
          component: StepDelivery
        },
        {
          path: 'confirm',
          name: 'wizard-confirm',
          component: StepConfirm
        },
      ]
    },
  ],
})

export default router
