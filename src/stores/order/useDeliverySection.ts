import { computed, type Ref } from 'vue'
import { DELIVERY_PRICE } from '@/wizard/constants.ts'
import type { OrderDraft } from '@/types/order.types.ts'

export function useDeliverySection(draft: Ref<OrderDraft>) {

  const price = computed(() => {
    if (draft.value.deliveryMethod === "courier") return DELIVERY_PRICE
    return 0
  })

  const isFilled = computed(() => {
    if (draft.value.deliveryMethod === "courier") {
      return Boolean(draft.value.firstName && draft.value.phone && draft.value.city && draft.value.address)
    }
    return Boolean(draft.value.firstName && draft.value.phone)
  })

  return { price, isFilled }
}