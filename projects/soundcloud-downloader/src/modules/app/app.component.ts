import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleDown';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PopupComponent } from '../popup/popup.component';
import { DomInjectorService } from '../dom-injector/dom-injector.service';

@Component({
  selector: 'downloader-app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(
    private bottomSheet: MatBottomSheet,
    private domInjector: DomInjectorService,
  ) {
  }

  ngOnInit() {
    this.domInjector.enable();
  }

  openPopupDownload(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.bottomSheet.open(PopupComponent);
  }
}
