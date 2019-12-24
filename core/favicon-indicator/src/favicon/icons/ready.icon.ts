import { IconProvider } from './icon-provider';
import { Params, Provider } from './@types';
import { getCanvas } from '../utils';
import { drawCircle } from './canvas.utils';

const DEFAULT_OPTIONS = {
  color: '#bbb',
  backgroundColor: '#00a100',
};

export class ReadyIcon extends IconProvider implements Provider {
  options = DEFAULT_OPTIONS;

  constructor(optionsPartial: Partial<typeof DEFAULT_OPTIONS> = {}) {
    super(optionsPartial);
  }

  private drawCheck(ctx, { size }) {
    ctx.font = `${ size }px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.options.color;
    ctx.fillText('✔', size / 2, size / 2);
  }

  getUrl({ size }: Params) {
    const canvas = getCanvas(size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    drawCircle(ctx, { size, color: this.options.backgroundColor });
    this.drawCheck(ctx, { size });

    return canvas.toDataURL();
  }
}
