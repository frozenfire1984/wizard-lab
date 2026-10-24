import { computed, type Ref } from 'vue'
import { SIZES } from '@/wizard/menu.ts'
import type { SizeId } from '@/types/pizza.types.ts'
import type { OrderDraft } from '@/types/order.types.ts'

export function useSizeSection(draft: Ref<OrderDraft>) {

  const selected = computed(() => {
    return SIZES.find((s) => s.id === draft.value.sizeId)
  })

  function select(id: SizeId) {
    draft.value.sizeId = id
  }

  return { selected, select }
}