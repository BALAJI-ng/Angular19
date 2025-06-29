import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset, selectCounterValue, AppState } from './store';
import { User, CreateUserRequest, UpdateUserRequest } from './user.model';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';

@Component({
  selector: 'app-ngrx',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss'
})
export class NgrxComponent implements OnInit {
  counter$: Observable<number>;
  userForm: FormGroup;
  isLoading = false; // Local loading state

  // User state observables
  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    // Counter observable
    this.counter$ = this.store.select(selectCounterValue);

    // User observables
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
    this.loading$ = this.store.select(UserSelectors.selectUserLoading);
    this.error$ = this.store.select(UserSelectors.selectUserError);

    // Initialize form
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    // Add some sample users to see the form working
    this.addSampleUsers();

    // Subscribe to selected user for editing
    this.selectedUser$.subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          email: user.email,
          password: '' // Don't populate password for security
        });
      }
    });
  }

  private addSampleUsers(): void {
    // Add sample users for demonstration
    const sampleUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        mobile: '+1234567890',
        email: 'john.doe@example.com',
        password: 'password123'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        mobile: '+1987654321',
        email: 'jane.smith@example.com',
        password: 'password123'
      }
    ];

    sampleUsers.forEach(user => {
      this.store.dispatch(UserActions.createUser({ user }));
    });
  }

  // Counter methods
  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
  // User form methods
  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true; // Start loading
      const formValue = this.userForm.value;

      this.selectedUser$.subscribe(selectedUser => {
        if (selectedUser) {
          // Update existing user
          const updateRequest: UpdateUserRequest = {
            id: selectedUser.id,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            mobile: formValue.mobile,
            email: formValue.email
          };
          this.store.dispatch(UserActions.updateUser({ user: updateRequest }));
        } else {
          // Create new user
          const createRequest: CreateUserRequest = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            mobile: formValue.mobile,
            email: formValue.email,
            password: formValue.password
          };
          this.store.dispatch(UserActions.createUser({ user: createRequest }));
        }

        // Simulate API call delay and reset loading
        setTimeout(() => {
          this.isLoading = false;
          this.resetForm();
        }, 1000);

      }).unsubscribe();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.store.dispatch(UserActions.clearSelectedUser());
  }
  loadUsers(): void {
    this.isLoading = true;
    this.store.dispatch(UserActions.loadUsers());
    // Simulate API call delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  editUser(user: User): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }

  clearError(): void {
    this.store.dispatch(UserActions.clearError());
  }
}
