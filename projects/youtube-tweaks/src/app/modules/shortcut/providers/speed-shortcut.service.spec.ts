import { TestBed } from '@angular/core/testing';

import { SpeedShortcutService } from './speed-shortcut.service';

describe('SpeedShortcutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeedShortcutService = TestBed.get(SpeedShortcutService);
    expect(service).toBeTruthy();
  });
});
