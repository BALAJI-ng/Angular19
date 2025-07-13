import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ReducCapgeminiComponent } from './reduc-capgemini.component';

describe('ReducCapgeminiComponent', () => {
  let component: ReducCapgeminiComponent;
  let fixture: ComponentFixture<ReducCapgeminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReducCapgeminiComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ReducCapgeminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
