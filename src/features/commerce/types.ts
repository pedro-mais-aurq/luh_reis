export type PaymentProvider = 'kiwify' | 'hotmart';
export type PaymentStatus = 'pending' | 'approved' | 'declined' | 'refunded' | 'cancelled' | 'expired';
export interface ProductReference { id: string; provider: PaymentProvider; providerProductId: string }
export interface PurchaseIntent { productId: string; returnUrl: string; userId?: string }
export interface PublicPaymentConfig { provider: PaymentProvider | null; products: readonly ProductReference[]; checkoutUrl: string | null }
export interface PaymentRecord { id: string; productId: string; status: PaymentStatus; confirmedAt: string | null }
