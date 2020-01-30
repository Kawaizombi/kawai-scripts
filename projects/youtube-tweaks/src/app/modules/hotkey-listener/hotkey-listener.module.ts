import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyListenerComponent } from './hotkey-listener.component';
import { SpeedHotkeyComponent } from './speed-hotkey/speed-hotkey.component';

@NgModule({
  declarations: [HotkeyListenerComponent, SpeedHotkeyComponent],
  exports: [
    HotkeyListenerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HotkeyListenerModule { }
