// OKLCH -> sRGB hex, with CSS Color 4 style gamut mapping (reduce chroma,
// hold lightness and hue) rather than naive per-channel clipping.
function toLinear(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
     4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}
const inGamut = (rgb) => rgb.every((v) => v >= -0.00001 && v <= 1.00001);

export function oklch(L, C, H) {
  let mapped = false;
  let c = C;
  if (!inGamut(toLinear(L, C, H))) {
    mapped = true;
    let lo = 0, hi = C;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(toLinear(L, mid, H))) lo = mid; else hi = mid;
    }
    c = lo;
  }
  const srgb = toLinear(L, c, H).map((v) => {
    const x = Math.min(1, Math.max(0, v));
    const g = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, g)) * 255);
  });
  const hex = '#' + srgb.map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();
  return { hex, mapped };
}

// WCAG relative luminance + contrast, from an sRGB hex.
export function contrast(hexA, hexB) {
  const lum = (hex) => {
    const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const a = lum(hexA), b = lum(hexB);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
