import { TestBed } from '@angular/core/testing';

import { RelatedImgService } from './related-img.service';

describe('RelatedImgService', () => {
  let service: RelatedImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
