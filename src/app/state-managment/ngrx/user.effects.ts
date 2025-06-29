import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            mergeMap(action =>
                this.userService.createUser(action.user).pipe(
                    map(user => UserActions.createUserSuccess({ user })),
                    catchError(error => of(UserActions.createUserFailure({ error: error.message })))
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap(action =>
                this.userService.updateUser(action.user).pipe(
                    map(user => UserActions.updateUserSuccess({ user })),
                    catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(action =>
                this.userService.deleteUser(action.id).pipe(
                    map(id => UserActions.deleteUserSuccess({ id })),
                    catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
