import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../event-bus-service';
import { ChildComponent } from '../child/child.component';

export interface Event {
  type: string;
  payload?: any;
}

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  constructor(private eventBus: EventBusService) {}
  
  ngOnInit() {
    // Example user object; replace with actual user data as needed
    const user: User = { id: 1, name: 'Default User' };
    
    // Emit the user object through the EventBusService
    console.log('Parent emitting user:', user);
    this.eventBus.emit(user);
  }
}
