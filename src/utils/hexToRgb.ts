export default function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '');

  var bigint = parseInt(hex, 16);

  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // 결과를 객체로 반환
  return {
    r: r,
    g: g,
    b: b,
  };
}
