import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxStoreComponent } from './redux-store.component';

describe('ReduxStoreComponent', () => {
  let component: ReduxStoreComponent;
  let fixture: ComponentFixture<ReduxStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReduxStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReduxStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
