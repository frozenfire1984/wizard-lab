<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { users } from '@/data/users.ts'

const route = useRoute()
const router = useRouter()

const user = computed(() => {
  const id = Number(route.params.id)
  return users.find((el) => el.id === id)
})

function goBack () {
  router.push({name: 'users'})
}

</script>

<template>
  <div class="page-content">
    <h1>User details</h1>

    <div v-if="user">
      <p>user id: {{ user.id }}</p>
      <p>user name: {{ user.name }}</p>
      <p>user role: {{ user.role }}</p>
      <p v-if="user.active"><em>Active</em></p>
    </div>
    <div v-else>
      User not found
    </div>

    <button @click="goBack" class="btn">Back</button>
  </div>
</template>
