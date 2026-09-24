<script setup lang="ts">
import { users } from '@/data/users.ts'
</script>

<template>
  <div class="page-content">
    <h1>Users</h1>
    <div>
      <ul>
        <li v-for="user in users" :key="user.id">
          <RouterLink :to="{
            name: 'user',
            params: { id: user.id}
          }">
            {{ user.name}}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

