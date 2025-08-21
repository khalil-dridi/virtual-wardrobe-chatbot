import { TestBed } from '@angular/core/testing';

import { ConfirmPasswordService } from './confirm-password.service';

describe('ConfirmPasswordService', () => {
  let service: ConfirmPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
