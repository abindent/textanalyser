export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360; // Keeps hue in valid range (0-360)
  return `hsl(${hue}, 60%, 50%)`; // HSL for vibrant colors
}