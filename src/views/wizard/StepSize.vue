<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SIZES } from '@/wizard/menu.ts'
import { useOrderStore } from '@/stores/order.ts'

const order = useOrderStore()

const router = useRouter()

function nextStep() {
  router.push({ name: 'wizard-toppings' })
}
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step size</h2>
    <div class="wizard-step__body">
      <ul :class="$style.items">
        <li
          v-for="size in SIZES"
          :class="[$style.item, { [$style.selected]: size.id === order.sizeId }]"
          :key="size.id"
        >
          <div>
            <strong :class="$style.title">{{ size.title }}</strong>
          </div>
          <div><strong>Diameter:</strong> {{ size.diameter }}cm</div>
          <div><strong>Price:</strong> {{ size.price }}$</div>
          <button class="btn" @click="order.selectSize(size.id)">Choice</button>
        </li>
      </ul>
      <hr />
      {{ order.size?.title }}
    </div>
    <footer class="wizard-step__footer">
      <button class="btn" @click="nextStep" :disabled="!order.sizeId">Next</button>
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
  box-shadow: 0 0 0 5px rgba(0, 255, 0, .2);
}
</style>
