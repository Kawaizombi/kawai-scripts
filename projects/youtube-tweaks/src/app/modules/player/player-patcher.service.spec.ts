import { TestBed } from '@angular/core/testing';

import { PlayerPatcherService } from './player-patcher.service';

describe('PlayerPatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerPatcherService = TestBed.get(PlayerPatcherService);
    expect(service).toBeTruthy();
  });
});
