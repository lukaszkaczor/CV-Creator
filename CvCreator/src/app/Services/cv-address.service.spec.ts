import { TestBed } from '@angular/core/testing';

import { CvAddressService } from './cv-address.service';

describe('CvAddressService', () => {
  let service: CvAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
