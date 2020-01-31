import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutKeysComponent } from './shortcut-keys.component';

describe('ShortcutKeysComponent', () => {
  let component: ShortcutKeysComponent;
  let fixture: ComponentFixture<ShortcutKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
