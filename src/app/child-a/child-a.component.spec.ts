import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ChildAComponent } from './child-a.component';

describe('ChildAComponent', () => {
  let component: ChildAComponent;
  let fixture: ComponentFixture<ChildAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildAComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
