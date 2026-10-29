import type { WizardStep } from '@/types/steps.types.ts'
import StepSize from '@/views/wizard/StepSize.vue'
import StepToppings from '@/views/wizard/StepToppings.vue'
import StepDelivery from '@/views/wizard/StepDelivery.vue'
import StepConfirm from '@/views/wizard/StepConfirm.vue'
import type { NonEmptyArray } from '@/types/steps.types.ts'


export const WIZARD_STEPS = [
  {
    name: 'wizard-size',
    path: 'size',
    title: 'Size',
    component: StepSize
  },
  {
    name: 'wizard-toppings',
    path: 'toppings',
    title: 'Toppings',
    component: StepToppings
  },
  {
    name: 'wizard-delivery',
    path: 'delivery',
    title: 'Delivery',
    component: StepDelivery
  },
  {
    name: 'wizard-confirm',
    path: 'confirm',
    title: 'Confirm',
    component: StepConfirm
  }
] satisfies NonEmptyArray<WizardStep>