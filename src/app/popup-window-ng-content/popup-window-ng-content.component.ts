import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-window-ng-content',
  imports: [CommonModule],
  templateUrl: './popup-window-ng-content.component.html',
  styleUrl: './popup-window-ng-content.component.scss'
})
export class PopupWindowNgContentComponent {

  @Input() isOpen: boolean = false;
  @Input() title: string = 'Popup Window';

  @Output() close = new EventEmitter<string>();
  closePopup(): void {
    this.close.emit("Popup is now closed");
  }

}
