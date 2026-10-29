import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WizardView from '@/views/wizard/WizardView.vue'
import StepSize from '@/views/wizard/StepSize.vue'
import StepToppings from '@/views/wizard/StepToppings.vue'
import StepDelivery from '@/views/wizard/StepDelivery.vue'
import StepConfirm from '@/views/wizard/StepConfirm.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import { useOrderStore } from '@/stores/order.ts'
import { WIZARD_STEPS } from '@/wizard/steps.ts'

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
      redirect: { name: WIZARD_STEPS[0].name },
      children: WIZARD_STEPS.map((step) => ({
        path: step.path,
        name: step.name,
        component: step.component,
        meta: {
          title: step.title,
        }
      })),
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
    },
  ],
})

export default router
