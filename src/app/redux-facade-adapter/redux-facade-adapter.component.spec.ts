import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxFacadeAdapterComponent } from './redux-facade-adapter.component';

describe('ReduxFacadeAdapterComponent', () => {
  let component: ReduxFacadeAdapterComponent;
  let fixture: ComponentFixture<ReduxFacadeAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReduxFacadeAdapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReduxFacadeAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
