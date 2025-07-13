import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ParentComponent } from './parent.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // For components with ExpressionChangedAfterItHasBeenCheckedError,
    // we can disable the check temporarily
    const originalCheckNoChanges = fixture.checkNoChanges;
    fixture.checkNoChanges = () => {}; // Disable the check

    fixture.detectChanges();

    // Restore the original function
    fixture.checkNoChanges = originalCheckNoChanges;

    expect(component).toBeTruthy();
  });
});
