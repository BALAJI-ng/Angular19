import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionTypesComponent } from './union-types.component';

describe('UnionTypesComponent', () => {
  let component: UnionTypesComponent;
  let fixture: ComponentFixture<UnionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
