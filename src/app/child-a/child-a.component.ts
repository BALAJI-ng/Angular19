import { Component } from '@angular/core';
import { ChildService } from '../child.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-a',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './child-a.component.html',
  styleUrl: './child-a.component.scss',
})
export class ChildAComponent {
  inputText: string = '';
  behaviourSubjectInput: string = '';
  replaySubjectInput: string = '';
  asyncSubjectInput: string = '';

  private childService: ChildService;

  constructor(childService: ChildService) {
    this.childService = childService;
  }

  sendData() {
    this.childService.sendData(this.inputText);
    this.inputText = '';
  }

  sendBehaviourData() {
    this.childService.sendBehaviourSubject(this.behaviourSubjectInput);
    this.behaviourSubjectInput = '';
  }

  sendReplayData() {
    this.childService.sendReplaySubject(this.replaySubjectInput);
    this.replaySubjectInput = '';
  }

  sendAsyncData() {
    this.childService.sendAsyncSubject(this.asyncSubjectInput);
    this.asyncSubjectInput = '';
  }
}
