import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReatingTypesFromTypesComponent } from './reating-types-from-types.component';

describe('ReatingTypesFromTypesComponent', () => {
  let component: ReatingTypesFromTypesComponent;
  let fixture: ComponentFixture<ReatingTypesFromTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReatingTypesFromTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReatingTypesFromTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
