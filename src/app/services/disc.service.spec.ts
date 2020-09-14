import { TestBed } from '@angular/core/testing';

import { DiscService } from './disc.service';

describe('DiscService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscService = TestBed.get(DiscService);
    expect(service).toBeTruthy();
  });
});
