<script setup lang="ts">
import { useRouter } from 'vue-router'
import { TOPPINGS } from '@/wizard/menu.ts'
import { useOrderStore } from '@/stores/order.ts'

const order = useOrderStore();

const router = useRouter()

function nextStep() {
  router.push({ name: 'wizard-delivery' })
}
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step toppings</h2>
    <div class="wizard-step__body">

      <div>Selected size: <strong>{{ order.size?.title }}</strong></div>

      <hr>

      <ul :class="$style.items">
        <li
          :class="[$style.item, { [$style.selected]: order.isToppingSelected(item.id)}]" v-for="item in TOPPINGS"
          :key="item.id">
          <strong>{{ item.title }}</strong>
          <div :class="$style.price">
            <strong>Price:</strong> {{ item.price }}$
          </div>
          <button class="btn" @click="order.toggleTopping(item.id)">Add</button>
        </li>
      </ul>
    </div>
    <footer class="wizard-step__footer">
      <button class="btn" :disabled="!order.hasTopping" @click="nextStep">Next</button>
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
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px;
  border: 1px lightgrey solid;
  border-radius: 8px;
}

.price {
  margin-left: auto;
}

.selected {
  border-color: darkgreen;
  box-shadow: 0 0 0 5px rgba(0, 255, 0, .2);
}
</style>

<style scoped>


</style>
