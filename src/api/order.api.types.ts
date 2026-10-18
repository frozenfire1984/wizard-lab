import type { OrderFinal } from '@/types/order.types.ts'
import type { Price } from '@/types/order.types.ts'

export type Timestamp = number | null
export type UUIDString = string

export interface SubmitOrderPayload {
  orderId: UUIDString,
  date: Timestamp,
  userAgent: string,
  order: OrderFinal,
}

export interface SubmitOrderResponse {
  orderId: UUIDString,
  date: Timestamp,
  price: Price
}

