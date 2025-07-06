import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { loadUsers, addUser } from './store';
import { 
  selectAllUsers, 
  selectLoading, 
  selectError, 
  selectUsersCount,
  selectUserByName 
} from './user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  // Observable streams
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usersCount$: Observable<number>;

  constructor(private store: Store) {
    // Initialize selectors
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.usersCount$ = this.store.select(selectUsersCount);
  }

  // Load all users from JSON Server
  loadUsers(): void {
    this.store.dispatch(loadUsers());
  }

  // Add a user to JSON Server
  addUser(name: string): void {
    this.store.dispatch(addUser({ name }));
  }

  // Get user by name
  getUserByName(name: string): Observable<User | undefined> {
    return this.store.select(selectUserByName(name));
  }
}