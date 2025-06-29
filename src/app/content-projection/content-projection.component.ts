import { Component, ViewChild, ContentChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { PopupWindowNgContentComponent } from '../popup-window-ng-content/popup-window-ng-content.component';
import { CommonModule } from '@angular/common';
import { NgContainerNgTemplateComponent } from '../ng-container-ng-template/ng-container-ng-template.component';
import { ViewChildComponent } from '../view-child/view-child.component';
import { ContentChildComponent } from "../content-child/content-child.component";
import { ParentComponent } from "../parent/parent.component";
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-content-projection',
  imports: [PopupWindowNgContentComponent, CommonModule, NgContainerNgTemplateComponent, ViewChildComponent, ContentChildComponent, ParentComponent, ChildComponent],
  templateUrl: './content-projection.component.html',
  styleUrl: './content-projection.component.scss'
})
export class ContentProjectionComponent implements AfterViewInit, AfterContentInit {

  showPopUp: boolean = false;
  whatIsStatusNow: string = 'Ready to open popup';

  // ViewChild references
  @ViewChild(ViewChildComponent) viewChildRef!: ViewChildComponent;
  @ViewChild(PopupWindowNgContentComponent) popupRef!: PopupWindowNgContentComponent;

  // ContentChild reference
  @ContentChild(ContentChildComponent) contentChildRef!: ContentChildComponent;

  getFromViewChild: string = 'Loading ViewChild data...';
  contentChildStatus: string = 'ContentChild not initialized...';
  ngAfterContentInit(): void {
    // Access ContentChild after content has been projected
    if (this.contentChildRef) {
      this.contentChildStatus = 'ContentChild found and accessible!';
      console.log('ContentChild component found:', this.contentChildRef);
    } else {
      this.contentChildStatus = 'ContentChild not found';
    }
  }

  ngAfterViewInit(): void {
    // Access ViewChild after the view has been initialized
    if (this.viewChildRef) {
      this.getFromViewChild = this.viewChildRef.myVariableBalajiForViewChild;
    }
  }

  openPopup(): void {
    this.showPopUp = true;
    this.whatIsStatusNow = 'Popup is now open';
  }
  messageFromChild(message: string): void {
    console.log(message);
    this.whatIsStatusNow = message;
    this.showPopUp = false; // Reset showPopUp to false so the button can be clicked again
  }

  refreshViewChildData(): void {
    if (this.viewChildRef) {
      this.getFromViewChild = this.viewChildRef.myVariableBalajiForViewChild;
    }
  }
  updateChildMessage(): void {
    if (this.viewChildRef) {
      this.viewChildRef.updateMessage();
      this.refreshViewChildData();
    }
  }

  // NEW: ViewChild approach as alternative to EventEmitter
  closePopupViaViewChild(): void {
    console.log('ViewChild approach: Closing popup');
    if (this.popupRef) {
      this.popupRef.isOpen = false; // Directly modify child property
      this.whatIsStatusNow = 'Popup closed via ViewChild';
      this.showPopUp = false;
    }
  }

  checkPopupStatus(): void {
    if (this.popupRef) {
      console.log('Popup isOpen status:', this.popupRef.isOpen);
      console.log('Popup title:', this.popupRef.title);
    }
  }
  togglePopupViaViewChild(): void {
    if (this.popupRef) {
      this.popupRef.isOpen = !this.popupRef.isOpen;
      this.showPopUp = this.popupRef.isOpen;
      this.whatIsStatusNow = this.popupRef.isOpen ? 'Popup opened via ViewChild' : 'Popup closed via ViewChild';
    }
  }

  // ContentChild interaction methods
  interactWithContentChild(): void {
    if (this.contentChildRef) {
      this.contentChildRef.onProjectedButtonClick();
      console.log('Interacted with ContentChild from parent component!');
    }
  }

  getContentChildInfo(): string {
    if (this.contentChildRef) {
      return this.contentChildRef.getProjectedButtonInfo();
    }
    return 'ContentChild not available';
  }

  checkContentChildStatus(): void {
    console.log('ContentChild Status:', this.contentChildStatus);
    if (this.contentChildRef) {
      console.log('ContentChild methods available:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.contentChildRef)));
    }
  }
}
