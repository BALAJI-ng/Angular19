import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadOperatorComponent } from './spread-operator.component';

describe('SpreadOperatorComponent', () => {
  let component: SpreadOperatorComponent;
  let fixture: ComponentFixture<SpreadOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreadOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
