import { TestBed } from '@angular/core/testing';

import { AfService } from './af.service';

describe('AfService', () => {
  let service: AfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
