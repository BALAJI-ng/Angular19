import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorSyntaxComponent } from './constructor-syntax.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConstructorSyntaxComponent', () => {
  let component: ConstructorSyntaxComponent;
  let fixture: ComponentFixture<ConstructorSyntaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorSyntaxComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructorSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
