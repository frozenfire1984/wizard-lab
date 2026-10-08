<script setup lang="ts">
import { useOrderStore } from '@/stores/order.ts'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const order = useOrderStore()
const router = useRouter()

const isNewOrderAbility = computed(() => {
  return order.checkoutStatus === 'success' || order.checkoutStatus === 'error'
})

function goToNewOrder () {
  order.resetCheckoutStatus()
  router.push('/wizard/size')
}

</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step confirm</h2>
    <div class="wizard-step__body">
      <div class="btn-wrapper">
        <button :disabled="order.checkoutStatus !== 'idle'" class="btn" @click="order.checkout()">Confirm Order!</button>
        <button v-if="isNewOrderAbility" class="btn" @click="goToNewOrder()">New Order!</button>
      </div>

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
