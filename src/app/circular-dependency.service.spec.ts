import { TestBed } from '@angular/core/testing';

import { CircularDependencyService } from './circular-dependency.service';

describe('CircularDependencyService', () => {
  let service: CircularDependencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircularDependencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
