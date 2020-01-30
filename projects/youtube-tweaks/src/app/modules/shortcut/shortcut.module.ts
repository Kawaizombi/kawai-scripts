import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHORTCUT, ShortcutService } from './shortcut.service';
import { ShortcutComponent } from './shortcut.component';
import { SpeedShortcutService } from './providers/speed-shortcut.service';
import { QualityShortcutService } from './providers/quality-shortcut.service';

@NgModule({
  declarations: [ShortcutComponent],
  imports: [CommonModule],
  exports: [ShortcutComponent],
  providers: [
    ShortcutService,
    { provide: SHORTCUT, useClass: SpeedShortcutService, multi: true },
    { provide: SHORTCUT, useClass: QualityShortcutService, multi: true },
  ],
})
export class ShortcutModule {
}
