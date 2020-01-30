import { TestBed } from '@angular/core/testing';

import { QualityShortcutService } from './quality-shortcut.service';

describe('QualityShortcutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualityShortcutService = TestBed.get(QualityShortcutService);
    expect(service).toBeTruthy();
  });
});
