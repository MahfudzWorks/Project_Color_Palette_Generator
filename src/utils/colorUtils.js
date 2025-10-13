export const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export const generateGradient = (baseColor) => {
  const fakeDiv = document.createElement("div");
  fakeDiv.style.color = baseColor;
  document.body.appendChild(fakeDiv);
  const computed = window.getComputedStyle(fakeDiv).color;
  document.body.removeChild(fakeDiv);

  const [r, g, b] = computed.match(/\d+/g).map(Number);

  return Array.from({ length: 5 }, (_, i) => {
    const factor = 1 - i * 0.15;
    const newR = Math.min(255, Math.floor(r * factor));
    const newG = Math.min(255, Math.floor(g * factor));
    const newB = Math.min(255, Math.floor(b * factor));
    return rgbToHex(newR, newG, newB);
  });
};
