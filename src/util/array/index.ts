export function sum(arr: number[]) {
  let sum = 0;
  arr.forEach((n) => {
    sum += n;
  });
  return sum;
}
