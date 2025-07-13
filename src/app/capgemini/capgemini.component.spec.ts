import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapgeminiComponent } from './capgemini.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CapgeminiComponent', () => {
  let component: CapgeminiComponent;
  let fixture: ComponentFixture<CapgeminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapgeminiComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CapgeminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
