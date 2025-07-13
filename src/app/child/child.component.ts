import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  public dataSubject$ = new Subject<any>();

  constructor(private http: HttpClient) {}
  title = 'Child Component';
  counter = 0;

  increment() {
    this.counter++;
  }

  getMessage() {
    return `Hello from ${this.title}! Counter: ${this.counter}`;
  }

  fetchData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      tap((response) => {
        this.dataSubject$.next(response);
      })
    );
  }

  getData() {
    return this.dataSubject$.asObservable();
  }
}
