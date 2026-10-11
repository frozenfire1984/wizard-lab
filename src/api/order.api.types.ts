import type { OrderDraft } from '@/types/order.types.ts'
import type { Price } from '@/types/order.types.ts'

export type Timestamp = number | null
export type UUIDString = string

export interface SubmitOrderPayload {
  orderId: UUIDString,
  date: Timestamp,
  userAgent: string,
  order: OrderDraft
}

export interface SubmitOrderResponse {
  orderId: UUIDString,
  date: Timestamp,
  price: Price
}

export interface SubmitOrderResponseErr {
  status : "error",
  errorText : string
}