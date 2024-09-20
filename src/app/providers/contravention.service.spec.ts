import { TestBed } from '@angular/core/testing';

import { ContraventionService } from './contravention.service';

describe('ContraventionService', () => {
  let service: ContraventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContraventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
