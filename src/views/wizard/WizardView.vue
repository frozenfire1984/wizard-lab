<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
    </aside>
    <div class="wizard__body">
      <RouterView />
    </div>
  </section>
</template>

<style scoped lang="scss">
.wizard {
  display: grid;
  grid-template-columns: 1fr 4fr;
  block-size: 100%;

  &__aside {
    border-right: 1px var(--pl-border-color) solid;
  }

  &__step-nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
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

:deep(.wizard-step__body) {
  flex: 1;
}
</style>
