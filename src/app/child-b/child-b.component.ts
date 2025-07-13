import { Component } from '@angular/core';
import { ChildService } from '../child.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-b',
  imports: [CommonModule],
  templateUrl: './child-b.component.html',
  styleUrl: './child-b.component.scss',
})
export class ChildBComponent {
  data$: Observable<string>;

  dataBehaviourSubjectArray: string[] = [];
  dataReplaySubjectArray: string[] = [];
  dataAsyncSubject: string[] = [];

  constructor(private childService: ChildService) {
    //normal Subject
    this.data$ = this.childService.getData();

    //Behaviour Subject
    this.childService.getBehaviourSubject().subscribe((response) => {
      this.dataBehaviourSubjectArray.push(response);
    });

    //Replay Subject
    this.childService.getReplaySubject().subscribe((response) => {
      this.dataReplaySubjectArray.push(response);
    });

    //Async Subject
    this.childService.getAsyncSubject().subscribe((response) => {
      this.dataAsyncSubject.push(response);
    });
  }
}
