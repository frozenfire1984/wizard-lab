<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, provide } from 'vue'

const route = useRoute()
const currentStep = computed(() => route.name)

provide('currentStep', currentStep)
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="logo">Pizza Lab</div>
        <nav class="nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink :to="{ name: 'wizard' }">Order Pizza!</RouterLink>
          <RouterLink :to="{ name: 'archive' }">Archive</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>

  <footer class="footer">
    <div class="container">pizza lab (c)</div>
  </footer>
</template>
