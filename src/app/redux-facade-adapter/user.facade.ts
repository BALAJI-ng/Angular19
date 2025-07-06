import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { User } from './user.model';
import { 
  addUser, 
  updateUser, 
  deleteUser, 
  selectUser, 
  clearSelection, 
  setLoading, 
  setError 
} from './store';
import { 
  selectAllUsers, 
  selectUserEntities, 
  selectUserIds, 
  selectUserTotal, 
  selectLoading, 
  selectError, 
  selectSelectedUser, 
  selectUsersByAge, 
  selectUsersByName, 
  selectUsersCount,
  selectUserByEmail 
} from './user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  // Selectors - Observable streams
  users$: Observable<User[]>;
  userEntities$: Observable<Dictionary<User>>;
  userIds$: Observable<string[] | number[]>;
  userTotal$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedUser$: Observable<User | null | undefined>;
  usersByAge$: Observable<User[]>;
  usersByName$: Observable<User[]>;
  usersCount$: Observable<number>;

  constructor(private store: Store) {
    // Initialize selectors in constructor
    this.users$ = this.store.select(selectAllUsers);
    this.userEntities$ = this.store.select(selectUserEntities);
    this.userIds$ = this.store.select(selectUserIds);
    this.userTotal$ = this.store.select(selectUserTotal);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.usersByAge$ = this.store.select(selectUsersByAge);
    this.usersByName$ = this.store.select(selectUsersByName);
    this.usersCount$ = this.store.select(selectUsersCount);
  }

  // Actions - Methods to dispatch actions
  addUser(userData: { name: string; age: number; email: string }): void {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(addUser(userData));
  }

  updateUser(id: string, changes: Partial<User>): void {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(updateUser({ id, changes }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(deleteUser({ id }));
  }

  selectUser(id: string): void {
    this.store.dispatch(selectUser({ id }));
  }

  clearSelection(): void {
    this.store.dispatch(clearSelection());
  }

  setLoading(loading: boolean): void {
    this.store.dispatch(setLoading({ loading }));
  }

  setError(error: string | null): void {
    this.store.dispatch(setError({ error }));
  }

  // Utility methods
  getUserByEmail(email: string): Observable<User | undefined> {
    return this.store.select(selectUserByEmail(email));
  }

  // Bulk operations
  addMultipleUsers(users: { name: string; age: number; email: string }[]): void {
    this.store.dispatch(setLoading({ loading: true }));
    users.forEach(user => {
      this.store.dispatch(addUser(user));
    });
    this.store.dispatch(setLoading({ loading: false }));
  }

  // Validation helpers
  isEmailTaken(email: string): Observable<boolean> {
    return new Observable(observer => {
      this.getUserByEmail(email).subscribe(user => {
        observer.next(!!user);
        observer.complete();
      });
    });
  }

  // Statistics
  getAverageAge(): Observable<number> {
    return new Observable(observer => {
      this.users$.subscribe(users => {
        if (users.length === 0) {
          observer.next(0);
        } else {
          const average = users.reduce((sum, user) => sum + user.age, 0) / users.length;
          observer.next(Math.round(average * 100) / 100);
        }
        observer.complete();
      });
    });
  }

  // Search functionality
  searchUsers(query: string): Observable<User[]> {
    return new Observable(observer => {
      this.users$.subscribe(users => {
        const filtered = users.filter(user => 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(filtered);
        observer.complete();
      });
    });
  }
}
