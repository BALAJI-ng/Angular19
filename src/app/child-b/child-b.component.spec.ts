import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ChildBComponent } from './child-b.component';

describe('ChildBComponent', () => {
  let component: ChildBComponent;
  let fixture: ComponentFixture<ChildBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildBComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
