import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

import { User } from './user.model';
import { UserFacadeService } from './user.facade';

@Component({
  selector: 'app-redux-facade-adapter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './redux-facade-adapter.component.html',
  styleUrl: './redux-facade-adapter.component.scss'
})
export class ReduxFacadeAdapterComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  displayinHtml$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usersCount$: Observable<number>;
  selectedUser$: Observable<User | null | undefined>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacadeService
  ) {
    // Use facade selectors
    this.displayinHtml$ = this.userFacade.users$;
    this.loading$ = this.userFacade.loading$;
    this.error$ = this.userFacade.error$;
    this.usersCount$ = this.userFacade.usersCount$;
    this.selectedUser$ = this.userFacade.selectedUser$;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(150), Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  finalSubmit(): void {
    if (!this.userForm.valid) {
      return;
    }

    const userData = this.userForm.value;

    // Use facade service instead of directly dispatching actions
    this.userFacade.addUser({
      name: userData.name,
      age: userData.age,
      email: userData.email
    });

    // Reset form after successful submission
    this.userForm.reset();
  }

  // Additional methods using facade
  updateUser(id: string, changes: Partial<User>): void {
    this.userFacade.updateUser(id, changes);
  }

  deleteUser(id: string): void {
    this.userFacade.deleteUser(id);
  }

  selectUser(id: string): void {
    this.userFacade.selectUser(id);
  }

  clearSelection(): void {
    this.userFacade.clearSelection();
  }

  searchUsers(query: string): Observable<User[]> {
    return this.userFacade.searchUsers(query);
  }

  getAverageAge(): Observable<number> {
    return this.userFacade.getAverageAge();
  }

}
