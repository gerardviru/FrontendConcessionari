import { TestBed } from '@angular/core/testing';

import { ConcessionariService } from './concessionari.service';

describe('ConcessionariService', () => {
  let service: ConcessionariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcessionariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
