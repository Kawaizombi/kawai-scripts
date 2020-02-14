import { TestBed } from '@angular/core/testing';

import { YtPlayerControlService } from './yt-player-control.service';

describe('YtPlayerControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YtPlayerControlService = TestBed.get(YtPlayerControlService);
    expect(service).toBeTruthy();
  });
});
