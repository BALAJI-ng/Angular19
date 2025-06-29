import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ng-container-ng-template',
  imports: [CommonModule],
  templateUrl: './ng-container-ng-template.component.html',
  styleUrl: './ng-container-ng-template.component.scss'
})
export class NgContainerNgTemplateComponent implements OnInit {

  // Action observable for simulating async operations
  action$ = timer(2000);

  // Input templates for external usage
  @Input() initialTemplate: TemplateRef<any> | undefined;
  @Input() workingTemplate: TemplateRef<any> | undefined;
  @Input() doneTemplate: TemplateRef<any> | undefined;

  // Internal template references
  @ViewChild('defaultInitialTemplate', { static: true }) defaultInitialTemplate!: TemplateRef<any>;
  @ViewChild('defaultWorkingTemplate', { static: true }) defaultWorkingTemplate!: TemplateRef<any>;
  @ViewChild('defaultDoneTemplate', { static: true }) defaultDoneTemplate!: TemplateRef<any>;
  @ViewChild('cardTemplate', { static: true }) cardTemplate!: TemplateRef<any>;
  @ViewChild('listTemplate', { static: true }) listTemplate!: TemplateRef<any>;

  // Current state management
  currentTemplate: TemplateRef<any> | undefined;
  currentState: 'initial' | 'working' | 'done' = 'initial';
  isProcessing = false;

  // Demo data for templates
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer'
  };

  products = [
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 800, category: 'Electronics' },
    { id: 3, name: 'Book', price: 25, category: 'Education' }
  ];

  // Current view mode
  currentView: 'button-demo' | 'card-view' | 'list-view' = 'button-demo';

  ngOnInit(): void {
    this.setInitialState();
  }

  private setInitialState(): void {
    this.currentTemplate = this.initialTemplate || this.defaultInitialTemplate;
    this.currentState = 'initial';
    this.isProcessing = false;
  }

  saveData(): void {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.currentState = 'working';
    this.currentTemplate = this.workingTemplate || this.defaultWorkingTemplate;

    this.action$.subscribe(() => {
      this.currentState = 'done';
      this.currentTemplate = this.doneTemplate || this.defaultDoneTemplate;
      this.isProcessing = false;
    });
  }

  resetDemo(): void {
    this.setInitialState();
  }
  switchView(view: 'button-demo' | 'card-view' | 'list-view'): void {
    this.currentView = view;
    this.resetDemo();

    switch (view) {
      case 'card-view':
        this.currentTemplate = this.cardTemplate;
        break;
      case 'list-view':
        this.currentTemplate = this.listTemplate;
        break;
      default:
        this.setInitialState();
        break;
    }
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}
