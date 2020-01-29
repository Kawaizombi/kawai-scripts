import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OverlayFix } from './overlay-fix.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OverlayContainer, useClass: OverlayFix }
  ],
})
export class OverlayFixModule { }
