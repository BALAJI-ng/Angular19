import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWindowNgContentComponent } from './popup-window-ng-content.component';

describe('PopupWindowNgContentComponent', () => {
  let component: PopupWindowNgContentComponent;
  let fixture: ComponentFixture<PopupWindowNgContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupWindowNgContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupWindowNgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
