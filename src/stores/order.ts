import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SizeId, ToppingId } from '@/types/pizza.types.ts'
import { SIZES, TOPPINGS } from '@/wizard/menu.ts'

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

  // Price

  const discount = computed(() => {
    return price.value > 1200 ? 300 : 0
  })

  const price = computed(() => {
    const base = size.value?.price ?? 0
    const extra = toppings.value.reduce((sum, t) => {
      return sum + t.price
    }, 0)
    return base + extra
  })

  const totalPrice = computed(() => price.value - discount.value)

  return {
    sizeId, size, selectSize,
    toppingIds, toppings, toggleTopping, isToppingSelected, hasTopping,
    totalPrice, discount
  }
})
