export const drawCircle = (ctx: CanvasRenderingContext2D, {size, color}) => {
  const half = size / 2;

  ctx.beginPath();
  ctx.moveTo(half, half);
  ctx.arc(half, half, half, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
};
