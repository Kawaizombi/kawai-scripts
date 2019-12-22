import { FaviconProvider } from './@types';
import { getCanvas } from '../utils';
import { ProviderBase } from './provider-base';

const DEFAULT_OPTIONS = {
  color: '#00a100',
  backgroundColor: '#bbb',
};

export class Progress extends ProviderBase implements FaviconProvider {
  percentage = 0;
  options = DEFAULT_OPTIONS;

  constructor(optionsPartial: Partial<typeof DEFAULT_OPTIONS>) {
    super(optionsPartial);
  }

  getUrl({ size }): string {
    const canvas = getCanvas(size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    this.redrawBg(ctx, { size });

    if(this.percentage > 0) {
      this.redrawPie(ctx, { size });
    }

    return canvas.toDataURL();
  }

  private redrawPie(ctx, { size }) {
    const half = size / 2;
    const startAngle = (-0.5) * Math.PI;
    const endAngle = (-0.5 + 2 * this.percentage / 100) * Math.PI;

    ctx.beginPath();
    ctx.moveTo(half, half);
    ctx.arc(half, half, half, startAngle, endAngle, false);
    ctx.lineTo(half, half);
    ctx.fillStyle = this.options.color;
    ctx.fill();
  }

  private redrawBg(ctx, { size }) {
    const half = size / 2;

    ctx.beginPath();
    ctx.moveTo(half, half);
    ctx.arc(half, half, half, 0, Math.PI * 2, false);
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fill();
  }

  setPercentage(percentage) {
    this.percentage = percentage;

    return this;
  }
}
