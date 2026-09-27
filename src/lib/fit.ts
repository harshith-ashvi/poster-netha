// ponytail: length-based font sizing, no DOM measuring. Swap for a measure-and-shrink hook if fonts overflow in practice.
export function fitFont(text: string, max: number, min: number, charsAtMax: number): number {
  const len = Math.max(text.length, 1);
  return Math.round(Math.min(max, Math.max(min, (max * charsAtMax) / len)));
}
