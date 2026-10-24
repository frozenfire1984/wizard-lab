import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DISCOUNT, MIN_PRICE_FOR_DISCOUNT } from '@/wizard/constants.ts'
import type { RequestStatus } from '@/types/request.types.ts'
import type { OrderDraft } from '@/types/order.types.ts'
import type { SubmitOrderResponse } from '@/api/order.api.types.ts'
import type { ArchiveOrder } from '@/types/archive.types.ts'
import { submitOrderApi } from '@/api/order.api.ts'
import { useArchiveStore } from '@/stores/archive.ts'
import { emptyDraft, buildOrder } from '@/wizard/order.factory.ts'
import { useSizeSection } from '@/stores/order/useSizeSection.ts'
import { useToppingSection } from '@/stores/order/useToppingSection.ts'
import { useDeliverySection } from '@/stores/order/useDeliverySection.ts'

export const useOrderStore = defineStore('order', () => {

  const draft = ref<OrderDraft>(emptyDraft())

  // Size
  const size = useSizeSection(draft)

  // Topping
  const topping = useToppingSection(draft)

  // Delivery
  const delivery = useDeliverySection(draft)

  // Price
  const price = computed(() => {
    const base = size.selected.value?.price ?? 0
    const extra = topping.items.value.reduce((sum, t) => {
      return sum + t.price
    }, 0)
    return base + extra
  })

  const discount = computed(() => {
    return price.value > MIN_PRICE_FOR_DISCOUNT ? DISCOUNT : 0
  })

  const totalPrice = computed(() => price.value - discount.value + delivery.price.value)

  // Confirm
  const responseState = ref<SubmitOrderResponse | null>(null)

  const checkoutStatus = ref<RequestStatus>('idle')

  function clearOrder() {
    draft.value = emptyDraft()
  }

  const canStartNewOrder = computed(() => {
    return checkoutStatus.value === 'success' || checkoutStatus.value === 'error'
  })

  function newOrder() {
    responseState.value = null
    checkoutStatus.value = 'idle'
  }

  function checkout() {
    checkoutStatus.value = 'loading'

    const archive = useArchiveStore()

    const builtOrder = buildOrder(draft.value, totalPrice.value)

    submitOrderApi(builtOrder)
      .then((resp) => {
        checkoutStatus.value = 'success'
        responseState.value = resp

        const orderArchive: ArchiveOrder = {
          ...builtOrder,
          orderId: resp.orderId,
          date: resp.date,
          priceFromServer: resp.price,
        }

        archive.addItem(orderArchive)
        clearOrder()
      })
      .catch((err) => {
        checkoutStatus.value = 'error'
        console.error(err)
      })
  }

  return {
    draft, size, topping,
    totalPrice, discount, delivery,
    responseState, checkoutStatus, checkout,  canStartNewOrder, newOrder
  }
})
