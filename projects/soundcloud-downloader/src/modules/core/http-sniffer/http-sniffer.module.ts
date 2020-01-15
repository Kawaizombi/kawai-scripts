import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpSnifferService } from './http-sniffer.service';


@NgModule({
  imports: [CommonModule],
  providers: [HttpSnifferService],
})
export class HttpSnifferModule {
  constructor(
    private sniffer: HttpSnifferService,
  ) {
    this.sniffer.enable();
  }
}
