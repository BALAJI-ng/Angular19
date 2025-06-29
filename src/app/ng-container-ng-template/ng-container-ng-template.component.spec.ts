import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContainerNgTemplateComponent } from './ng-container-ng-template.component';

describe('NgContainerNgTemplateComponent', () => {
  let component: NgContainerNgTemplateComponent;
  let fixture: ComponentFixture<NgContainerNgTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContainerNgTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContainerNgTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
