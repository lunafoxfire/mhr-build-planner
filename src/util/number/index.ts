export function truncateFloat(n: number, places: number = 2): string {
  return n.toFixed(places).replace(/\.?0+$/, '');
}
