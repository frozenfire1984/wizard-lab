<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.ts'
import { ref } from 'vue'

const counter = useCounterStore()

const input_counter = ref<number>(0)

</script>

<template>
  <div class="page-sub-content">
    <div>
      <p>{{ counter.count }}</p>
      <div>
        <button class="btn" @click="counter.increment">Increase count</button>
        <button class="btn" @click="counter.decrement">Decrease count</button>
        <hr>
        <input type="number" v-model="input_counter" />
        <br>
        <button class="btn" @click="counter.set(input_counter)">Set count</button>
        <br>
        <button class="btn" @click="counter.reset">Reset</button>
      </div>
      <p>Shop description</p>
    </div>
  </div>
</template>


