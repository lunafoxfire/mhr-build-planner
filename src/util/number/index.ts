export function truncateFloat(n: number, places: number = 2): string {
  return n.toFixed(places).replace(/\.?0+$/, '');
}

export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
