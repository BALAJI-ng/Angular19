import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentArchitectureComponent } from './component-architecture.component';

describe('ComponentArchitectureComponent', () => {
  let component: ComponentArchitectureComponent;
  let fixture: ComponentFixture<ComponentArchitectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentArchitectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentArchitectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
