import type { OrderState } from '@/types/orderState.types.ts'
import type { SubmitOrderPayload, SubmitOrderResponse, SubmitOrderResponseErr } from '@/api/order.api.types.ts'

export function submitOrderApi(orderPayload: OrderState): Promise<SubmitOrderResponse> {
  const finalPayload: SubmitOrderPayload = {
    orderId: crypto.randomUUID(),
    date: Date.now(),
    userAgent: navigator.userAgent,
    order: orderPayload,
  }

  let res

  // for testing! when laravel/node backend implemented, this condition will remove
  if (Math.random() < 0.5) {
    res = fetch('https://httpbin.org/delay/5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    })
  } else {
    res = fetch('https://httpbin.org/status/500')
  }

  return res
    .then((r) => {
      if (!r.ok) {
        throw new Error(`${r.status} ${r.statusText}`);
      }
      console.log(r)
      return r.json()
    })
    .then((body) => {
      console.log(body)
      return JSON.parse(body.data)
    })
    .then((data) => {
      console.log(data)

      return {
        orderId: data.orderId,
        date: data.date,
      }
    })
    .catch((err) => {
      console.error(err)

      throw new Error("api error", {cause: err })
    })
    .finally(() => {
      console.log("finish")
    })
}