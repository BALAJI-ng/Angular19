import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SimpleNgrxComponent } from './simple-ngrx.component';

describe('SimpleNgrxComponent', () => {
  let component: SimpleNgrxComponent;
  let fixture: ComponentFixture<SimpleNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleNgrxComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
