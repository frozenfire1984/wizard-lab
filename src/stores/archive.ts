import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ArchiveOrder } from '@/types/archive.types.ts'

export const useArchiveStore = defineStore('archive', () => {
  const items = ref<ArchiveOrder[]>([])

  function addItem (obj: ArchiveOrder) {
    items.value.push(obj)
  }

  return {
    items, addItem
  }
})