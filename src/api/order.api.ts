import type { OrderFinal } from '@/types/order.types.ts'
import type { SubmitOrderPayload, SubmitOrderResponse, SubmitOrderResponseErr } from '@/api/order.api.types.ts'

export function submitOrderApi(orderPayload: OrderFinal): Promise<SubmitOrderResponse> {
  const finalPayload: SubmitOrderPayload = {
    orderId: crypto.randomUUID(),
    date: Date.now(),
    userAgent: navigator.userAgent,
    order: orderPayload,
  }

  let res
  const alwaysSus = true
  let randomFloat = 0.5

  if (alwaysSus) randomFloat = 1

  // for testing! when laravel/node backend implemented, this condition will remove
  if (Math.random() < randomFloat) {
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
      return JSON.parse(body.data) // need remove when we will use real api
    })
    .then((data) => {
      console.log(data)

      return {
        orderId: data.orderId,
        date: data.date,
        price: data.order.price,
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