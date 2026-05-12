export function easeInOutSine(value: number): number {
  const clamped = Math.min(1, Math.max(0, value));
  return -(Math.cos(Math.PI * clamped) - 1) / 2;
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}
