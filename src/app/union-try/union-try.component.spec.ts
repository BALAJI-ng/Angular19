import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionTryComponent } from './union-try.component';

describe('UnionTryComponent', () => {
  let component: UnionTryComponent;
  let fixture: ComponentFixture<UnionTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnionTryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnionTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
