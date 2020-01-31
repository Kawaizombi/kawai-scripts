import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutsPanelComponent } from './shortcuts-panel.component';

describe('ShortcutsPanelComponent', () => {
  let component: ShortcutsPanelComponent;
  let fixture: ComponentFixture<ShortcutsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
