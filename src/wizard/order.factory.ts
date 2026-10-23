import type { OrderDraft, OrderFinal, Price } from '@/types/order.types.ts'

export function emptyDraft():OrderDraft {
  return {
    sizeId: null,
    toppingIds: [],
    deliveryMethod: 'pickup',
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address: "",
  }
}

export function buildOrder(draft: OrderDraft, price: Price):OrderFinal {

  if (draft.sizeId === null) throw new Error('buildOrder: sizeId not exist')

  const { city, address, ...base } = draft

  if (draft.deliveryMethod === 'pickup') {
    return {
      ...base,
      sizeId: draft.sizeId,
      deliveryMethod: 'pickup',
      price,
    }
  }

  return {
    ...base,
    sizeId: draft.sizeId,
    deliveryMethod: 'courier',
    city,
    address,
    price,
  }
}