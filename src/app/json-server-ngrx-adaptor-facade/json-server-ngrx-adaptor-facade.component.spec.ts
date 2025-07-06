import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonServerNgrxAdaptorFacadeComponent } from './json-server-ngrx-adaptor-facade.component';

describe('JsonServerNgrxAdaptorFacadeComponent', () => {
  let component: JsonServerNgrxAdaptorFacadeComponent;
  let fixture: ComponentFixture<JsonServerNgrxAdaptorFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonServerNgrxAdaptorFacadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonServerNgrxAdaptorFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
