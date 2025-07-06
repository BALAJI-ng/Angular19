import { TestBed } from '@angular/core/testing';

import { RxjsMockService } from './ngrx-form/rxjs-mock.service';

describe('RxjsMockService', () => {
  let service: RxjsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
