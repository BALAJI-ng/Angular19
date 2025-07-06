import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaywrightComponent } from './playwright.component';

describe('PlaywrightComponent', () => {
  let component: PlaywrightComponent;
  let fixture: ComponentFixture<PlaywrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaywrightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaywrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
