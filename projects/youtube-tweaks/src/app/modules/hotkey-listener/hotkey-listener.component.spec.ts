import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyListenerComponent } from './hotkey-listener.component';

describe('HotkeyListenerComponent', () => {
  let component: HotkeyListenerComponent;
  let fixture: ComponentFixture<HotkeyListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeyListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeyListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
