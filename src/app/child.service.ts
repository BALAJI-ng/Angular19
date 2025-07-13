import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  delay,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  //Normal Subject to hold the data
  // This will allow Child A to send data and Child B to receive it
  //Multiple components can subscribe to this subject
  // and receive updates when data is sent from Child A

  constructor(private http: HttpClient) {}

  // Subject
  private subject = new Subject<string>();
  getData(): Observable<string> {
    return this.subject.asObservable();
  }
  sendData(message: string) {
    this.subject.next(message);
  }

  //behaviuor Subject
  private behaviourSubject = new BehaviorSubject<string>('Hi Balaji');
  getBehaviourSubject(): Observable<string> {
    return this.behaviourSubject.asObservable();
  }
  sendBehaviourSubject(message: string) {
    this.behaviourSubject.next(message);
  }

  //Replay Subject
  private replaySubject = new ReplaySubject<string>(2);
  getReplaySubject(): Observable<string> {
    return this.replaySubject.asObservable();
  }
  sendReplaySubject(message: string) {
    this.replaySubject.next(message);
  }

  //Async Subject
  private asyncSubject = new AsyncSubject<string>();
  getAsyncSubject(): Observable<string> {
    return this.asyncSubject.asObservable();
  }
  sendAsyncSubject(msg: string) {
    this.asyncSubject.next(msg);
    // AsyncSubject only emits when completed
    // Uncomment the line below to see the last value
    this.asyncSubject.complete();
  }
}
