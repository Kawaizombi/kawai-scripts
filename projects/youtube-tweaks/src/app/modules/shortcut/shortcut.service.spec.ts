import { TestBed } from '@angular/core/testing';

import { ShortcutService } from './shortcut.service';

describe('ShortcutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShortcutService = TestBed.get(ShortcutService);
    expect(service).toBeTruthy();
  });
});
