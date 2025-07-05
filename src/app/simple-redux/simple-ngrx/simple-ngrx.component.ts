import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { addUser } from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-simple-ngrx',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simple-ngrx.component.html',
  styleUrl: './simple-ngrx.component.scss'
})
export class SimpleNgrxComponent implements OnInit {

  userForm!: FormGroup;
  users$: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ simpleReducer: User[] }>
  ) {
    this.users$ = this.store.select('simpleReducer');
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  finalSubmit() {
    if (this.userForm.valid) {

      const entity = {
        name: this.userForm.value.name,
        email: this.userForm.value.email
      }

      // Correct dispatch syntax: pass the name property
      this.store.dispatch(addUser(entity));

      // Reset form after successful submission
      this.userForm.reset();
    }
  }
}
