import { TestBed } from '@angular/core/testing';

import { CvExperienceService } from './cv-experience.service';

describe('CvExperienceService', () => {
  let service: CvExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
