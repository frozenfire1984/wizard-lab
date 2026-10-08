import type { OrderState } from '@/types/orderState.types.ts'
import type { Timestamp, UUIDString } from '@/api/order.api.types.ts'


export interface ArchiveOrder extends OrderState {
  orderId: UUIDString,
  date: Timestamp,
}