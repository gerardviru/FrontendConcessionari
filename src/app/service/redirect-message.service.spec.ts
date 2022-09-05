import { TestBed } from '@angular/core/testing';

import { RedirectMessageService } from './redirect-message.service';

describe('RedirectMessageService', () => {
  let service: RedirectMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
