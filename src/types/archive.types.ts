import type { OrderFinal } from '@/types/order.types.ts'
import type { Timestamp, UUIDString } from '@/api/order.api.types.ts'


export interface ArchiveOrder extends OrderFinal {
  orderId: UUIDString,
  date: Timestamp,
}