import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {

  @Input() quantity: number = 0;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();


  increase() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

}
