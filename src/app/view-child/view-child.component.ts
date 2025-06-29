import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-child',
  imports: [CommonModule],
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.scss'
})
export class ViewChildComponent {
  myVariableBalajiForViewChild: string = "Hey Balaji. I am View Child variable";

  updateMessage(): void {
    const messages = [
      "ViewChild data updated successfully!",
      "Hello from the ViewChild component!",
      "ViewChild is working perfectly!",
      "Data synchronized with parent component!",
      "ViewChild communication established!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    this.myVariableBalajiForViewChild = messages[randomIndex];
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
