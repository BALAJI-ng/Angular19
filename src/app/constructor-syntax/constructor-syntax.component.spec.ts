import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorSyntaxComponent } from './constructor-syntax.component';

describe('ConstructorSyntaxComponent', () => {
  let component: ConstructorSyntaxComponent;
  let fixture: ComponentFixture<ConstructorSyntaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorSyntaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
