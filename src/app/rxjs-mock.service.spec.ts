import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RxjsMockService } from './ngrx-form/rxjs-mock.service';

describe('RxjsMockService', () => {
  let service: RxjsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RxjsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
