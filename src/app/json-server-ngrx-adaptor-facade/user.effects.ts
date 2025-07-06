import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  addUserSuccess,
  addUserFailure
} from './store';

@Injectable()
export class UserEffects {
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  // Load Users from JSON Server
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.http.get<User[]>(this.apiUrl).pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  // Add User to JSON Server
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap(({ name }) => {
        const newUser = { 
          name,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        };
        
        return this.http.post<User>(this.apiUrl, newUser).pipe(
          map(user => addUserSuccess({ user })),
          catchError(error => of(addUserFailure({ error: error.message })))
        );
      })
    )
  );
}
