import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedHotkeyComponent } from './speed-hotkey.component';

describe('SpeedHotkeyComponent', () => {
  let component: SpeedHotkeyComponent;
  let fixture: ComponentFixture<SpeedHotkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedHotkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedHotkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
