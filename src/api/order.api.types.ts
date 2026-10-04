import type { OrderState } from '@/types/orderState.types.ts'

type Timestamp = number
type UUIDString = string

export interface SubmitOrderPayload {
  orderId: UUIDString,
  date: Timestamp,
  userAgent: string,
  order: OrderState
}

export interface SubmitOrderResponse {
  orderId: UUIDString,
  date: Timestamp,
}

export interface SubmitOrderResponseErr {
  status : "error",
  errorText : string
}