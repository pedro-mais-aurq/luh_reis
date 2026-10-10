export interface GoogleIdentity { provider: 'google'; subject: string; email: string; emailVerified: boolean }
export interface User { id: string; name: string | null; email: string; identities: readonly GoogleIdentity[] }
export interface AuthSession { user: User; expiresAt: string }
export interface PurchasedProduct { productId: string; paymentId: string; purchasedAt: string }
export type AuthorizationState = 'unauthenticated' | 'pending' | 'authorized' | 'denied' | 'expired';
export interface AccessGrant { userId: string; productId: string; state: AuthorizationState; validFrom: string | null; validUntil: string | null; purchase: PurchasedProduct | null }
/** P3: sessão e autorização verificadas por backend. Não armazenar conteúdo restrito no bundle. */
export interface AuthService {
  startGoogleSignIn(returnTo: string): Promise<{ redirectUrl: string }>;
  getSession(): Promise<AuthSession | null>;
  signOut(): Promise<void>;
  getVerifiedAccess(productId: string): Promise<AccessGrant>;
}
