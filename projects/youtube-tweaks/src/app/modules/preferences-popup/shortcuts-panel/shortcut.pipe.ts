import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcut'
})
export class ShortcutPipe implements PipeTransform {
  transform(shortcut: string): string {
    const _shortcut = shortcut
      .split(' + ')
      .map((key) => `<span class="shortcut-key">${key}</span>`)
      .join(' + ');
    return `<span class="shortcut">${_shortcut}</span>`;
  }

}
