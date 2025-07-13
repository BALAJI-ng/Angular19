import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NgrxFormComponent } from './ngrx-form.component';

describe('NgrxFormComponent', () => {
  let component: NgrxFormComponent;
  let fixture: ComponentFixture<NgrxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxFormComponent],
      providers: [
        provideMockStore({}),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgrxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
