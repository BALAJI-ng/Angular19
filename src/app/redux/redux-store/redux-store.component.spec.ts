import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ReduxStoreComponent } from './redux-store.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReduxStoreComponent', () => {
  let component: ReduxStoreComponent;
  let fixture: ComponentFixture<ReduxStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReduxStoreComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReduxStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
