<script setup lang="ts">
import { useOrderStore } from '@/stores/order.ts'

const order = useOrderStore()
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step confirm</h2>
    <div class="wizard-step__body">
      <button :disabled="order.checkoutStatus !== 'idle'" class="btn" @click="order.checkout()">Confirm Order!</button>

      <hr v-if="order.checkoutStatus !== 'idle'" />

      <div v-if="order.checkoutStatus === 'loading'" :class="$style.send">Order sending...</div>
      <div v-if="order.checkoutStatus === 'error'" :class="$style.err">Error order!</div>
      <div v-if="order.checkoutStatus === 'success'" :class="$style.sus">Order complete!</div>
    </div>
  </div>
</template>

<style module>
.send {
  color: gray;
}

.err {
  color: red;
}

.sus {
  color: green;
}

</style>
