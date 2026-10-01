<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order.ts'

const order = useOrderStore()

const router = useRouter()

function nextStep() {
  router.push({ name: 'wizard-confirm' })
}
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">Step delivery</h2>
    <div class="wizard-step__body">
      <form action="" class="form-container">
        <div class="form-radio-group">
          <label for="pickup" class="radio-item">
            <input v-model="order.deliveryMethod" type="radio" value="pickup" name="deliveryMethod" id="pickup" />
            Pickup
          </label>
          <label for="courier" class="radio-item">
            <input v-model="order.deliveryMethod" type="radio" value="courier" name="deliveryMethod" id="courier"  />
            Courier
          </label>
        </div>

        <div class="form-item">
          <label for="firstName" class="form-label">First Name *</label>
          <input
            v-model="order.firstName"
            required
            class="form-input"
            type="text"
            name="firstName"
            id="firstName"
            autocomplete="none"
            list="firstNameList"
          />
          <!-- for quick fill while testing -->
          <datalist id="firstNameList">
            <option value="John"></option>
            <option value="Sem"></option>
          </datalist>
        </div>

        <div class="form-item">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            v-model="order.lastName"
            class="form-input"
            type="text"
            name="lastName"
            id="lastName"
            autocomplete="none"
            list="lastNameList"
          />

          <!-- for quick fill while testing -->
          <datalist id="lastNameList">
            <option>Ivanov</option>
            <option>Petrov</option>
          </datalist>
        </div>

        <div class="form-item">
          <label for="phone" class="form-label">Phone *</label>
          <input
            v-model="order.phone"
            required class="form-input"
            type="text"
            name="phone"
            id="phone"
            autocomplete="none"
            list="phoneList"
          />
          <!-- for quick fill while testing -->
          <datalist id="phoneList">
            <option>+9(950)045-25-47</option>
          </datalist>
        </div>

        <template v-if="order.deliveryMethod === 'courier'">
          <div class="form-item">
            <label for="city" class="form-label">City</label>
            <input
              v-model="order.city"
              required
              class="form-input"
              type="text"
              name="city"
              id="city"
              autocomplete="none"
              list="cityList"
            />

            <!-- for quick fill while testing -->
            <datalist id="cityList">
              <option>Los Angeles</option>
            </datalist>
          </div>

          <div class="form-item">
            <label for="city" class="form-label">Address</label>
            <textarea
              v-model="order.address"
              required
              class="form-textarea"
              name="address"
              id="address"
              autocomplete="none"
            ></textarea>
            <div class="form-example">10635 Santa Monica Blvd, Los Angeles, CA 90025, USA</div>
          </div>
        </template>

        <div v-if="order.deliveryPrice">
          Delivery price: <strong>{{ order.deliveryPrice }}$</strong>
        </div>

      </form>



    </div>
    <footer class="wizard-step__footer">
      <button class="btn" :disabled="!order.isDeliveryFilled" @click="nextStep">Next</button>
    </footer>
  </div>
</template>

<style scoped lang="scss"></style>
