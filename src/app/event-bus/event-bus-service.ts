import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private subject = new Subject<any>();

  emit(event: any): void {
    this.subject.next(event);
  }

  on(): Observable<any> {
    return this.subject.asObservable();
  }
}
