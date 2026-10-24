<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useOrderStore } from '@/stores/order.ts'
import { computed, inject } from 'vue'

const order = useOrderStore()

const date = computed(() => {
  if (order.responseState?.date) {
    return new Date(order.responseState.date).toLocaleString();
  } else {
    return null
  }
})

const currentStep = inject('currentStep')

</script>

<template>
  <section class="wizard">
    <aside class="wizard__aside">
      <nav class="wizard__step-nav">
        <RouterLink :to="{ name: 'wizard-size' }">Size</RouterLink>
        <RouterLink :to="{ name: 'wizard-toppings' }">Toppings</RouterLink>
        <RouterLink :to="{ name: 'wizard-delivery' }">Delivery</RouterLink>
        <RouterLink :to="{ name: 'wizard-confirm' }">Confirm</RouterLink>
      </nav>

      <div v-if="order.totalPrice || order.responseState?.price">
        <hr />
        Total price: <strong>{{ order.totalPrice || order.responseState?.price }}$</strong>
      </div>

      <div v-if="order.discount">
        Your discount: <strong :class="$style.discount">{{order.discount}}$</strong>
      </div>

      <div v-if="order.checkoutStatus === 'success'" :class="$style.susBadge">
        Order <em>{{ order.responseState?.orderId }}</em> created at <br />
        {{ date }}! <hr />
        Price: {{ order.responseState?.price }}$
      </div>
    </aside>

    <main class="wizard__body">
      <RouterView />
    </main>
  </section>

  <div class="debugger">
      <pre>
        currentStep:
        {{ currentStep }}

        Draft:
        {{ order.draft }}
      </pre>
  </div>

</template>

<style module>
.discount {
  color: red;
}

.susBadge {
  margin-top: 16px;
  padding: 12px;
  background-color: green;
  color: #fff;
  border-radius: 8px;
}

</style>

<style scoped lang="scss">
.wizard {
  display: grid;
  grid-template-columns: 1fr 4fr;
  block-size: 100%;

  &__aside {
    padding-right: 8px;
    border-right: 1px var(--pl-border-color) solid;
  }

  &__step-nav {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .router-link-active ~ a {
      pointer-events: none;
      opacity: .5;
      text-decoration: none;
    }
  }

  &__body {
    display: grid;
    padding-left: 24px;
  }
}

:deep(.wizard-step) {
  display: flex;
  flex-direction: column;
}

:deep(.wizard-step__title) {
  margin-bottom: 1em;
}

:deep(.wizard-step__body) {
  flex: 1;
}

:deep(.wizard-step__footer) {
  display: flex;
  justify-content: end;
}

.debugger {
  position: fixed;
  inset: auto auto 0 0;
  width: fit-content;
  overflow: auto;
  padding: 10px;
  border: 1px gray solid;
  background-color: #fff;
  font-size: 13px;
}
</style>
