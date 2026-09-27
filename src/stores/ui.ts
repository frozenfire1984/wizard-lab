import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isRouteLoading = ref<boolean>(false);


  function routeLoadingStateEnable() {
    isRouteLoading.value = true;
  }

  function routeLoadingStateDisable() {
    isRouteLoading.value = false;
  }

  return { isRouteLoading, routeLoadingStateEnable, routeLoadingStateDisable }
})
