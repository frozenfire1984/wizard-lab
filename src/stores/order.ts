import { defineStore } from 'pinia'
import { ref, computed, toRaw } from 'vue'
import type { SizeId, ToppingId } from '@/types/pizza.types.ts'
import type { DeliveryMethod } from '@/types/delivery.types.ts'
import { SIZES, TOPPINGS } from '@/wizard/menu.ts'
import { DISCOUNT, MIN_PRICE_FOR_DISCOUNT, DELIVERY_PRICE } from '@/wizard/constants.ts'
import type { RequestStatus } from '@/types/request.types.ts'
import type { OrderState } from '@/types/orderState.types.ts'
import { submitOrderApi } from '@/api/order.api.ts'

export const useOrderStore = defineStore('order', () => {

  // Size
  const sizeId = ref<SizeId | null>(null)

  const size = computed(() => {
    return SIZES.find((s) => s.id === sizeId.value)
  })

  function selectSize(id: SizeId) {
    sizeId.value = id
  }


  // Topping
  const toppingIds = ref<ToppingId[]>([])

  const toppings = computed(() => {
    return TOPPINGS.filter((s) => toppingIds.value.includes(s.id))
  })

  const hasTopping = computed(() => {
    return toppingIds.value.length > 0
  })
  
  function isToppingSelected(id: ToppingId) {
    return toppingIds.value.includes(id)
  }

  function toggleTopping(id: ToppingId) {
    const arr = new Set(toppingIds.value)

    if (arr.has(id)) {
      arr.delete(id)
    } else {
      arr.add(id)
    }

    toppingIds.value = [...arr]
  }

  // Delivery

  const deliveryMethod = ref<DeliveryMethod>('pickup')

  const deliveryPrice = computed(() => {
    if (deliveryMethod.value === "courier") return DELIVERY_PRICE
    return 0
  })

  const firstName = ref("")

  const lastName = ref("")

  const phone = ref("")

  const city = ref("")

  const address = ref("")

  const isDeliveryFilled = computed(() => {
    if (deliveryMethod.value === "courier") {
      return Boolean(firstName.value && phone.value && city.value && address.value)
    }
    return Boolean(firstName.value && phone.value)
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

  function buildOrder():OrderState {
    return {
      sizeId: sizeId.value,
      toppingIds: [...toppingIds.value],
      deliveryMethod: deliveryMethod.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      city: city.value,
      address: address.value,
    }
  }

  const orderRequestId = ref("")

  const checkoutStatus = ref<RequestStatus>('idle')

  function checkout() {
    checkoutStatus.value = 'loading'

    submitOrderApi(buildOrder())
      .then((r) => {

        console.log("returned data")
        console.log(r)

        checkoutStatus.value = 'success'
        orderRequestId.value = r.orderId || ""
        //console.log(r)
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
    sizeId, size, selectSize,
    toppingIds, toppings, toggleTopping, isToppingSelected, hasTopping,
    totalPrice, discount,
    deliveryMethod, deliveryPrice, firstName, lastName, phone, city, address, isDeliveryFilled,
    orderRequestId, checkoutStatus, checkout
  }
})
