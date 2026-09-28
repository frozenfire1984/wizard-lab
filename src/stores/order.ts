import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SizeId } from '@/types/pizza.types.ts'
import { SIZES } from '@/wizard/menu.ts'

export const useOrderStore = defineStore('order', () => {
  const sizeId = ref<SizeId | null>(null)

  const size = computed(() => {
    return SIZES.find((s) => s.id === sizeId.value)
  })

  function selectSize(id: SizeId) {
    sizeId.value = id
  }

  return { sizeId, size, selectSize }
})
