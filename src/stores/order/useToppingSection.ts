import { computed, type Ref } from 'vue'
import { TOPPINGS } from '@/wizard/menu.ts'
import type { ToppingId } from '@/types/pizza.types.ts'
import type { OrderDraft } from '@/types/order.types.ts'

export function useToppingSection(draft: Ref<OrderDraft>) {

  const items = computed(() => {
    return TOPPINGS.filter((s) => draft.value.toppingIds.includes(s.id))
  })

  const noEmpty = computed(() => {
    return draft.value.toppingIds.length > 0
  })

  function isSelected(id: ToppingId) {
    return draft.value.toppingIds.includes(id)
  }

  function toggle(id: ToppingId) {
    const arr = new Set(draft.value.toppingIds)

    if (arr.has(id)) {
      arr.delete(id)
    } else {
      arr.add(id)
    }

    draft.value.toppingIds = [...arr]
  }

  return { items, noEmpty, isSelected, toggle }
}