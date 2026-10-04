import { toRaw } from 'vue'
import type { OrderState } from '@/types/orderState.types.ts'

export async function submitOrder(orderState: OrderState): Promise<{ order: {} }> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })

  const fakeResp = {
    orderId: crypto.randomUUID(),
    date: Date.now(),
    userAgent: navigator.userAgentData ? navigator.userAgentData.brands : navigator.userAgent,
    order: {
      sizeId: orderState.sizeId,
      toppingIds: toRaw(orderState.toppingIds),
      deliveryMethod: orderState.deliveryMethod,
      firstName: orderState.firstName,
      lastName: orderState?.lastName,
      phone: orderState.phone,
      city: orderState?.city,
      address: orderState.address,
    }
  }

  if (Math.random() < 0.5) {
    throw new Error('Server error')
  }

  return { order: fakeResp }
}