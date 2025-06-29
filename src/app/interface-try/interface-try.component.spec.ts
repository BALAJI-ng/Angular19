import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceTryComponent } from './interface-try.component';

describe('InterfaceTryComponent', () => {
  let component: InterfaceTryComponent;
  let fixture: ComponentFixture<InterfaceTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfaceTryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
