import { Component, OnInit } from '@angular/core';
import { DomInjectorService } from '../dom-injector/dom-injector.service';

@Component({
  selector: 'sc-downloader-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private domInjector: DomInjectorService,
  ) {
  }

  ngOnInit() {
    this.domInjector.enable();
  }
}
