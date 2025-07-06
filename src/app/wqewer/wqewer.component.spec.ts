import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WqewerComponent } from './wqewer.component';

describe('WqewerComponent', () => {
  let component: WqewerComponent;
  let fixture: ComponentFixture<WqewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WqewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WqewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
