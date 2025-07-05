import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState } from './user.model';
import * as UserActions from './user.actions';
import { selectAllUsers, selectUsersLoading, selectUsersError, selectSelectedUser } from './user.selectors';

@Component({
  selector: 'app-redux-store',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './redux-store.component.html',
  styleUrl: './redux-store.component.scss'
})
export class ReduxStoreComponent implements OnInit {

  userForm!: FormGroup;

  // Store observables
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedUser$: Observable<User | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ userStore: UserState }>
  ) {
    // Initialize observables
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
    this.selectedUser$ = this.store.select(selectSelectedUser);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  finalSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      console.log('Submitting user:', user);

      // Dispatch action to store
      this.store.dispatch(UserActions.addUser({ user }));

      // Reset form after submission
      this.userForm.reset();
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
    }
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }

  editUser(user: User): void {
    this.selectUser(user);
    this.userForm.patchValue({
      name: user.name,
      age: user.age,
      email: user.email
    });
  }

  deleteUser(user: User): void {
    if (user.id && confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.store.dispatch(UserActions.deleteUser({ id: user.id }));
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.store.dispatch(UserActions.clearSelectedUser());
  }

  clearAllUsers(): void {
    if (confirm('Are you sure you want to clear all users?')) {
      this.store.dispatch(UserActions.resetUserState());
    }
  }

  // Helper methods for template
  getFormControlError(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Please enter a valid email';
      if (control.errors['min']) return `${controlName} must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `${controlName} must be less than ${control.errors['max'].max}`;
    }
    return '';
  }

  isFormControlInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control?.invalid && control?.touched);
  }
}
