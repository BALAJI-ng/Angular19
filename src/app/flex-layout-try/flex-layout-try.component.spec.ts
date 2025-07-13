import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexLayoutTryComponent } from './flex-layout-try.component';

describe('FlexLayoutTryComponent', () => {
  let component: FlexLayoutTryComponent;
  let fixture: ComponentFixture<FlexLayoutTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexLayoutTryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexLayoutTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
