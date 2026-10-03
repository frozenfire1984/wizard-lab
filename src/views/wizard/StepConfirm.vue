<script setup lang="ts">
import { ref } from 'vue'
import { submitOrder } from '@/api/order.api.ts'
import { useOrderStore } from '@/stores/order.ts'


const order = useOrderStore()

const isLoading = ref(false)
const isError = ref(false)
const isSubmitted = ref(false)
const isSus = ref(false)

function submit(payload: any) {
  const resp = submitOrder(payload)
  isLoading.value = true
  isSubmitted.value = true

  resp
    .then((r) => {
      isSus.value = true
      console.log(r)
    })
    .catch((err) => {
      isLoading.value = false
      isError.value = true
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
      console.log("finish!")
    })
}

</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step confirm</h2>
    <div class="wizard-step__body">
      <button :disabled="isLoading || isSubmitted" class="btn" @click="submit(order.$state)">Confirm Order!</button>

      <hr v-if="isSubmitted" />

      <div v-if="isLoading" :class="$style.send">Order sending...</div>
      <div v-if="isError" :class="$style.err">Error order!</div>
      <div v-if="isSus" :class="$style.sus">Order complete!</div>
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
