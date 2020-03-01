import { Component, ElementRef, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PopupComponent } from '../popup/popup.component';
import { DomInjectorService } from '../dom-injector/dom-injector.service';
import { MOBILE_VERSION } from '../../constants';

@Component({
  selector: 'sc-downloader-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(
    private bottomSheet: MatBottomSheet,
    private domInjector: DomInjectorService,
    private el: ElementRef<HTMLUnknownElement>,
  ) {
  }

  ngOnInit() {
    if(MOBILE_VERSION) {
      this.el.nativeElement.classList.add('mobile');
    }
    this.domInjector.enable();
  }

  openPopupDownload(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.bottomSheet.open(PopupComponent);
  }
}
