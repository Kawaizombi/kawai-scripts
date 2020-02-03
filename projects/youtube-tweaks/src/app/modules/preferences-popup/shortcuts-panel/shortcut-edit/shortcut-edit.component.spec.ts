import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutEditComponent } from './shortcut-edit.component';

describe('ShortcutEditComponent', () => {
  let component: ShortcutEditComponent;
  let fixture: ComponentFixture<ShortcutEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
