import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SIZES } from '@/wizard/menu.ts'
import { DISCOUNT, MIN_PRICE_FOR_DISCOUNT } from '@/wizard/constants.ts'
import { submitOrderApi } from '@/api/order.api.ts'
import { useArchiveStore } from '@/stores/archive.ts'
import { useDeliverySection } from '@/stores/order/useDeliverySection.ts'
import { emptyDraft, buildOrder } from '@/wizard/order.factory.ts'
import type { SizeId } from '@/types/pizza.types.ts'
import type { RequestStatus } from '@/types/request.types.ts'
import type { OrderDraft } from '@/types/order.types.ts'
import type { SubmitOrderResponse } from '@/api/order.api.types.ts'
import type { ArchiveOrder } from '@/types/archive.types.ts'
import { useToppingSection } from '@/stores/order/useToppingSection.ts'

export const useOrderStore = defineStore('order', () => {

  const draft = ref<OrderDraft>(emptyDraft())

  // Size
  const size = computed(() => {
    return SIZES.find((s) => s.id === draft.value.sizeId)
  })

  function selectSize(id: SizeId) {
    draft.value.sizeId = id
  }

  // Topping
  const topping = useToppingSection(draft)

  // Delivery
  const delivery = useDeliverySection(draft)

  // Price
  const price = computed(() => {
    const base = size.value?.price ?? 0
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
  const response = ref<SubmitOrderResponse | null>(null)

  const checkoutStatus = ref<RequestStatus>('idle')

  function clearOrder() {
    draft.value = emptyDraft()
  }

  function resetCheckoutStatus() {
    checkoutStatus.value = 'idle'
  }

  function checkout() {
    checkoutStatus.value = 'loading'

    const archive = useArchiveStore()

    const builtOrder = buildOrder(draft.value, totalPrice.value)

    submitOrderApi(builtOrder)
      .then((resp) => {
        checkoutStatus.value = 'success'
        response.value = resp

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
    draft, size, selectSize, topping,
    totalPrice, discount, delivery,
    response, checkoutStatus, checkout, resetCheckoutStatus
  }
})
