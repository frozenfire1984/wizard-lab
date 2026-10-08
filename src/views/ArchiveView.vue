<script setup lang="ts">
import { useArchiveStore } from '@/stores/archive.ts'

const archive = useArchiveStore()

</script>

<template>
  <section>
    <article>
      <h1>Archive</h1>
      <div>
        <ul>
          <li v-for="item in archive.items" :key="item.orderId">
            {{ item }}
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss"></style>
