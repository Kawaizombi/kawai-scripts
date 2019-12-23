import { IconProvider } from "./icon-provider";
import { Params, Provider } from "./@types";
import { getCanvas } from "../utils";

const DEFAULT_OPTIONS = {
  color: '#bbb',
  backgroundColor: '#00a100',
};

export class ReadyIcon extends IconProvider implements Provider {
  options = DEFAULT_OPTIONS;

  constructor(optionsPartial: Partial<typeof DEFAULT_OPTIONS> = {}) {
    super(optionsPartial);
  }

  private redrawBg(ctx, {size}) {
    const half = size / 2;

    ctx.beginPath();
    ctx.moveTo(half, half);
    ctx.arc(half, half, half, 0, Math.PI * 2, false);
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fill();
  }

  private drawCheck(ctx, {size}) {
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = this.options.color;
    ctx.fillText('✔', size / 2.5, size / 1.5);
  }

  getUrl({size}: Params) {
    const canvas = getCanvas(size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    this.redrawBg(ctx, {size});
    this.drawCheck(ctx, {size});

    return canvas.toDataURL();
  }
}
