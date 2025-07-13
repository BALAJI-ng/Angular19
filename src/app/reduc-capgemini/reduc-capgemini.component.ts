import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from './user.model';
import { addTask, deleteTask, updateTask } from './store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reduc-capgemini',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reduc-capgemini.component.html',
  styleUrl: './reduc-capgemini.component.scss',
})
export class ReducCapgeminiComponent implements OnInit {
  todoForm!: FormGroup;
  displayHtml$: Observable<Todo[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ myCapgeminiReducer: Todo[] }>
  ) {
    this.displayHtml$ = this.store.select('myCapgeminiReducer');
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required],
    });
  }

  submit() {
    if (!this.todoForm.valid) {
      return;
    }

    const entity: Todo = {
      id: Date.now(),
      name: this.todoForm.value.taskName,
      isCompleted: false,
    };

    this.store.dispatch(addTask(entity));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }

  completedTask(id: number) {
    this.store.dispatch(updateTask({ id }));
  }
}
