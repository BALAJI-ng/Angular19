import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { RxjsMockService } from './rxjs-mock.service';
import {
  selectForm,
  selectEmail,
  selectName,
  selectAge,
  selectLoading,
  selectError,
  selectLastApiResponse,
  selectSubmissionHistory,
  onNameUpdate,
  onEmailUpdate,
  onAgeUpdate,
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  clearForm,
  UserForm,
  FormState
} from './store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngrx-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './ngrx-form.component.html',
  styleUrl: './ngrx-form.component.scss'
})
export class NgrxFormComponent {

  name$: Observable<string>;
  age$: Observable<number>;
  email$: Observable<string>;
  form$: Observable<UserForm>;


  isNameValid$: Observable<boolean>;
  isEmailValid$: Observable<boolean>;
  isAgeValid$: Observable<boolean>


  constructor(private store: Store, private userService: RxjsMockService) {
    this.name$ = this.store.select(selectName);
    this.email$ = this.store.select(selectEmail);
    this.age$ = this.store.select(selectAge);
    this.form$ = this.store.select(selectForm);

    //validation Stream
    this.isNameValid$ = this.name$.pipe(
      map(name => name.length > 0 && name.trim().length > 0)
    )

    this.isEmailValid$ = this.email$.pipe(map(email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }))

    this.isAgeValid$ = this.age$.pipe(map(age => age > 0 && age <= 120))
  }

  onNameChange(name: string) {
    this.store.dispatch(onNameUpdate({ name }));
  }

  onEmailChange(email: string) {
    this.store.dispatch(onEmailUpdate({ email }));
  }

  onAgeChange(age: number) {
    this.store.dispatch(onAgeUpdate({ age }));
  }

  clearForm() {
    this.store.dispatch(onNameUpdate({ name: '' }));
    this.store.dispatch(onEmailUpdate({ email: '' }));
    this.store.dispatch(onAgeUpdate({ age: 0 }));
  }

  // Submit form to API
  submitForm() {
    this.form$.subscribe(formData => {
      this.store.dispatch(submitFormStart());

      this.userService.createUserMock(formData).subscribe({
        next: (response) => {
          console.log('✅ API Response:', response);
          this.store.dispatch(submitFormSuccess({ response }));
        },
        error: (error) => {
          console.error('❌ API Error:', error);
          this.store.dispatch(submitFormFailure({
            error: error.message || 'Failed to submit form'
          }));
        }
      });
    }).unsubscribe();
  }

  // Submit to real API (JSONPlaceholder)
  submitToRealAPI() {
    this.form$.subscribe(formData => {
      this.store.dispatch(submitFormStart());

      this.userService.createUser(formData).subscribe({
        next: (response) => {
          console.log('✅ Real API Response:', response);
          this.store.dispatch(submitFormSuccess({ response }));
        },
        error: (error) => {
          console.error('❌ Real API Error:', error);
          this.store.dispatch(submitFormFailure({
            error: error.message || 'Failed to submit to real API'
          }));
        }
      });
    }).unsubscribe();
  }

  // Load sample users
  loadSampleUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('📋 Users loaded:', response);
        // You can dispatch an action to update the store with users
      },
      error: (error) => {
        console.error('❌ Failed to load users:', error);
      }
    });
  }

  // Test payload logging
  logCurrentPayload() {
    this.form$.subscribe(formData => {
      console.log('📦 Current Form Payload:', {
        payload: formData,
        timestamp: new Date().toISOString(),
        validation: {
          nameValid: formData.name.length > 0,
          emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
          ageValid: formData.age > 0 && formData.age <= 120
        }
      });
    }).unsubscribe();
  }

}