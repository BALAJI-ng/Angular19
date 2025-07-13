import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../event-bus-service';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent implements OnInit {
  constructor(private eventBus: EventBusService) {}

  displayMessage: string = 'Child Component Initialized';
  userInfo: User | null = null;
  
  ngOnInit() {
    // Subscribe to events from the EventBusService
    this.eventBus.on().subscribe((event) => {
      console.log('Event received in ChildComponent:', event);
      
      if (event && typeof event === 'object' && event.id && event.name) {
        // Handle user object
        this.userInfo = event;
        this.displayMessage = `User: ${event.name} (ID: ${event.id})`;
      } else {
        // Handle string messages
        this.displayMessage = event;
      }
    });
  }

  // Add any methods or properties needed for the child component
  // This is a placeholder for future functionality
}
