import { Component, ContentChild, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements AfterViewInit, AfterContentInit {
  // ViewChild: References a child component declared in this component's template
  @ViewChild(ChildComponent) viewChildComponent!: ChildComponent;
  // ContentChild: References a child component projected via <ng-content>
  @ContentChild(ChildComponent) contentChildComponent!: ChildComponent;
  viewChildMessage = '';
  contentChildMessage = '';
  ngAfterViewInit(): void {
    // ViewChild is available after the view initializes
    if (this.viewChildComponent) {
      console.log('✅ ViewChild component found:', this.viewChildComponent);
      this.viewChildMessage = this.viewChildComponent.getMessage();
    } else {
      console.log('❌ ViewChild component not found');
      this.viewChildMessage = 'ViewChild not found';
    }
  }
  ngAfterContentInit(): void {
    // ContentChild is available after content projection initializes
    if (this.contentChildComponent) {
      console.log('✅ ContentChild component found:', this.contentChildComponent);
      this.contentChildMessage = this.contentChildComponent.getMessage();
    } else {
      console.log('❌ ContentChild component not found');
      this.contentChildMessage = 'ContentChild not found';
    }
  }

  // Methods to interact with ViewChild
  incrementViewChild() {
    if (this.viewChildComponent) {
      this.viewChildComponent.increment();
      this.viewChildMessage = this.viewChildComponent.getMessage();
    }
  }

  // Methods to interact with ContentChild
  incrementContentChild() {
    if (this.contentChildComponent) {
      this.contentChildComponent.increment();
      this.contentChildMessage = this.contentChildComponent.getMessage();
    }
  }
}
