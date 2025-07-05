import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNgrxComponent } from './simple-ngrx.component';

describe('SimpleNgrxComponent', () => {
  let component: SimpleNgrxComponent;
  let fixture: ComponentFixture<SimpleNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleNgrxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
