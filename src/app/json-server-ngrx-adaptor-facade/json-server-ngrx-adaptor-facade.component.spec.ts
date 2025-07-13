import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { JsonServerNgrxAdaptorFacadeComponent } from './json-server-ngrx-adaptor-facade.component';

describe('JsonServerNgrxAdaptorFacadeComponent', () => {
  let component: JsonServerNgrxAdaptorFacadeComponent;
  let fixture: ComponentFixture<JsonServerNgrxAdaptorFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonServerNgrxAdaptorFacadeComponent],
      providers: [
        provideMockStore({}),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonServerNgrxAdaptorFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
