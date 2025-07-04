import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  title = 'Child Component';
  counter = 0;

  increment() {
    this.counter++;
  }

  getMessage() {
    return `Hello from ${this.title}! Counter: ${this.counter}`;
  }
}
