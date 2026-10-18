import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SizeId, ToppingId } from '@/types/pizza.types.ts'
import { SIZES, TOPPINGS } from '@/wizard/menu.ts'
import { DISCOUNT, MIN_PRICE_FOR_DISCOUNT, DELIVERY_PRICE } from '@/wizard/constants.ts'
import type { RequestStatus } from '@/types/request.types.ts'
import type { OrderFinal, OrderDraft } from '@/types/order.types.ts'
import type { SubmitOrderResponse } from '@/api/order.api.types.ts'
import type { ArchiveOrder } from '@/types/archive.types.ts'
import { submitOrderApi } from '@/api/order.api.ts'
import { useArchiveStore } from '@/stores/archive.ts'

export const useOrderStore = defineStore('order', () => {

  function emptyDraft():OrderDraft {
    return {
      sizeId: null,
      toppingIds: [],
      deliveryMethod: 'pickup',
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      address: "",
    }
  }

  const draft = ref<OrderDraft>(emptyDraft())

  // Size
  const size = computed(() => {
    return SIZES.find((s) => s.id === draft.value.sizeId)
  })

  function selectSize(id: SizeId) {
    draft.value.sizeId = id
  }

  // Topping
  const toppings = computed(() => {
    return TOPPINGS.filter((s) => draft.value.toppingIds.includes(s.id))
  })

  const hasTopping = computed(() => {
    return draft.value.toppingIds.length > 0
  })
  
  function isToppingSelected(id: ToppingId) {
    return draft.value.toppingIds.includes(id)
  }

  function toggleTopping(id: ToppingId) {
    const arr = new Set(draft.value.toppingIds)

    if (arr.has(id)) {
      arr.delete(id)
    } else {
      arr.add(id)
    }

    draft.value.toppingIds = [...arr]
  }

  // Delivery
  const deliveryPrice = computed(() => {
    if (draft.value.deliveryMethod === "courier") return DELIVERY_PRICE
    return 0
  })

  const isDeliveryFilled = computed(() => {
    if (draft.value.deliveryMethod === "courier") {
      return Boolean(draft.value.firstName && draft.value.phone && draft.value.city && draft.value.address)
    }
    return Boolean(draft.value.firstName && draft.value.phone)
  })

  // Price
  const price = computed(() => {
    const base = size.value?.price ?? 0
    const extra = toppings.value.reduce((sum, t) => {
      return sum + t.price
    }, 0)
    return base + extra
  })

  const discount = computed(() => {
    return price.value > MIN_PRICE_FOR_DISCOUNT ? DISCOUNT : 0
  })

  const totalPrice = computed(() => price.value - discount.value + deliveryPrice.value)

  // Confirm
  const response = ref<SubmitOrderResponse | null>(null)

  const checkoutStatus = ref<RequestStatus>('idle')

  function clearOrder() {
    draft.value = emptyDraft()
  }

  function buildOrder():OrderFinal {

    if (draft.value.sizeId === null) throw new Error('buildOrder: sizeId not exist')

    return {
      ...draft.value,
      sizeId: draft.value.sizeId,
      city: draft.value.deliveryMethod === 'pickup' ? "" : draft.value.city,
      address: draft.value.deliveryMethod === 'pickup' ? "" : draft.value.address,
      price: totalPrice.value, // temporarily! When real backend will be done, this field has been replaced. We will get price form api
    }
  }

  function resetCheckoutStatus() {
    checkoutStatus.value = 'idle'
  }

  function checkout() {
    checkoutStatus.value = 'loading'

    const archive = useArchiveStore()

    const builtOrder = buildOrder()

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
      .finally(() => {
        //console.info("finish!")
      })
  }

  return {
    draft, size, selectSize,
    toppings, toggleTopping, isToppingSelected, hasTopping,
    totalPrice, discount, deliveryPrice, isDeliveryFilled,
    response, checkoutStatus, checkout, resetCheckoutStatus
  }
})
