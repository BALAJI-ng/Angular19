import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAndFlexLayoutComponent } from './grid-and-flex-layout.component';

describe('GridAndFlexLayoutComponent', () => {
  let component: GridAndFlexLayoutComponent;
  let fixture: ComponentFixture<GridAndFlexLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridAndFlexLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAndFlexLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
