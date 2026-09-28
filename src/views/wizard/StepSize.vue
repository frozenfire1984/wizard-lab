<script setup lang="ts">
import { ref, computed } from 'vue'
import { SIZES } from '@/wizard/menu.ts'
import type { SizeId } from '@/types/pizza.types'

const selectedSizeId = ref<SizeId | null>(null)

const currentSize = computed(() => {
  return SIZES.find((s) => s.id === selectedSizeId.value)
})

function selectSize(id: SizeId) {
  selectedSizeId.value = id
}
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step size</h2>
    <div class="wizard-step__body">
      <ul :class="$style.items">
        <li
          v-for="size in SIZES"
          :class="[$style.item, { [$style.selected]: size.id === selectedSizeId }]"
          :key="size.id"
        >
          <div>
            <strong :class="$style.title">{{ size.title }}</strong>
          </div>
          <div>
            <strong>Diameter:</strong> {{ size.diameter }}cm
          </div>
          <div>
            <strong>Price:</strong> {{ size.price }}$
          </div>
          <button class="btn" @click="selectSize(size.id)">Choice</button>
        </li>
      </ul>
      <hr />
      {{ currentSize?.title }}
    </div>
    <footer class="wizard-step__footer">
      <button class="btn">Next</button>
    </footer>
  </div>
</template>

<style module>
.items {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: grid;
  gap: 6px;
  padding: 12px;
  border: 1px lightgrey solid;
  border-radius: 8px;
}

.title {
  font-size: 1.1rem;
}

.selected {
  border-color: darkgreen;
}
</style>
