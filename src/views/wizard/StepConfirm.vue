<script setup lang="ts">
import { ref } from 'vue'
import { submitOrder } from '@/api/order.api.ts'
import { useOrderStore } from '@/stores/order.ts'
import type { OrderState } from '@/types/orderState.types.ts'
import type { RequestStatus } from '@/types/request.types.ts'


const order = useOrderStore()
const submitStatus = ref<RequestStatus>('idle')

function submit(orderState: OrderState) {
  submitStatus.value = 'loading'
  const resp = submitOrder(orderState)


  resp
    .then((r) => {
      submitStatus.value = 'success'
      console.log(r)
    })
    .catch((err) => {
      submitStatus.value = 'error'
      console.log(err)
    })
    .finally(() => {
      console.log("finish!")
    })
}

</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step confirm</h2>
    <div class="wizard-step__body">
      <button :disabled="submitStatus !== 'idle'" class="btn" @click="submit(order.$state)">Confirm Order!</button>

      <hr v-if="submitStatus !== 'idle'" />

      <div v-if="submitStatus === 'loading'" :class="$style.send">Order sending...</div>
      <div v-if="submitStatus === 'error'" :class="$style.err">Error order!</div>
      <div v-if="submitStatus === 'success'" :class="$style.sus">Order complete!</div>
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
