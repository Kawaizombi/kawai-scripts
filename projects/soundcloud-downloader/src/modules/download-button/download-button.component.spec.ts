import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadButtonComponent } from './download-button.component';

describe('DownloadButtonComponent', () => {
  let component: DownloadButtonComponent;
  let fixture: ComponentFixture<DownloadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
