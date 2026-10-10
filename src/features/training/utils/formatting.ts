export function formatClock(seconds: number): string {
  const value = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(value / 60).toString().padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')}`;
}
export function parseRest(value: string): { min: number; max: number } | null {
  const text = value.trim().toUpperCase();
  if (!text) return null;
  if (text === '0') return { min: 0, max: 0 };
  if (text === '1 MINUTO E MEIO') return { min: 90, max: 90 };
  const match = text.match(/^(\d+)(?:\s*(?:A|–|-)\s*(\d+))?\s*(SEGUNDOS|SEG\.?|S|MINUTOS?|MIN\.?)$/);
  if (!match) return null;
  const factor = match[3].startsWith('MIN') ? 60 : 1;
  const min = Number(match[1]) * factor, max = Number(match[2] || match[1]) * factor;
  return min <= max ? { min, max } : null;
}
export function remainingSeconds(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
