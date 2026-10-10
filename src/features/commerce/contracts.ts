import type { PurchaseIntent, PaymentRecord } from './types';
/** P2: backend confirma eventos. Nenhuma implementação de pagamentos na P1. */
export interface CommerceService {
  createPurchaseIntent(intent: PurchaseIntent): Promise<{ purchaseId: string; checkoutUrl: string }>;
  getVerifiedPayment(purchaseId: string): Promise<PaymentRecord>;
}
