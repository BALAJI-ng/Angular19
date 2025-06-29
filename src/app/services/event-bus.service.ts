import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DomainEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new BehaviorSubject<DomainEvent | null>(null);

  constructor() {
    console.log('🚌 EventBusService initialized - NO circular dependencies!');
  }

  // Publish events
  publish(event: Omit<DomainEvent, 'timestamp'>): void {
    const domainEvent: DomainEvent = {
      ...event,
      timestamp: new Date()
    };

    console.log('📡 Event published:', domainEvent);
    this.eventSubject.next(domainEvent);
  }

  // Subscribe to events
  subscribe(): Observable<DomainEvent | null> {
    return this.eventSubject.asObservable();
  }

  // Subscribe to specific event types
  subscribeToEventType(eventType: string): Observable<DomainEvent> {
    return new Observable(observer => {
      this.subscribe().subscribe(event => {
        if (event && event.type === eventType) {
          observer.next(event);
        }
      });
    });
  }
}
