import { TestBed } from '@angular/core/testing';

import { HttpSnifferService } from './http-sniffer.service';

describe('HttpSnifferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpSnifferService = TestBed.get(HttpSnifferService);
    expect(service).toBeTruthy();
  });
});
