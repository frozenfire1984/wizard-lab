<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-content">
    <h1>Shop</h1>
    <div>
      <nav>
        <RouterLink to="/shop/souvenirs">Souvenirs</RouterLink>
        <RouterLink to="/shop/gifts">Gifts</RouterLink>
      </nav>
      <hr />
      <RouterView />
    </div>
  </div>
</template>


