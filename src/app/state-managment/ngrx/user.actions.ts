import { createAction, props } from '@ngrx/store';
import { User, CreateUserRequest, UpdateUserRequest } from './user.model';

// Load Users Actions
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: string }>()
);

// Create User Actions
export const createUser = createAction(
    '[User] Create User',
    props<{ user: CreateUserRequest }>()
);
export const createUserSuccess = createAction(
    '[User] Create User Success',
    props<{ user: User }>()
);
export const createUserFailure = createAction(
    '[User] Create User Failure',
    props<{ error: string }>()
);

// Update User Actions
export const updateUser = createAction(
    '[User] Update User',
    props<{ user: UpdateUserRequest }>()
);
export const updateUserSuccess = createAction(
    '[User] Update User Success',
    props<{ user: User }>()
);
export const updateUserFailure = createAction(
    '[User] Update User Failure',
    props<{ error: string }>()
);

// Delete User Actions
export const deleteUser = createAction(
    '[User] Delete User',
    props<{ id: string }>()
);
export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ id: string }>()
);
export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: string }>()
);

// Select User Actions
export const selectUser = createAction(
    '[User] Select User',
    props<{ user: User }>()
);
export const clearSelectedUser = createAction('[User] Clear Selected User');

// Clear Error Action
export const clearError = createAction('[User] Clear Error');
