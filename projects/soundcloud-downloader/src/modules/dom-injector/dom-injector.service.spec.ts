import { TestBed } from '@angular/core/testing';

import { DomInjectorService } from './dom-injector.service';

describe('DomInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomInjectorService = TestBed.get(DomInjectorService);
    expect(service).toBeTruthy();
  });
});
