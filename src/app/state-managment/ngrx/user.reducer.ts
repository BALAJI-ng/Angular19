import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.model';
import * as UserActions from './user.actions';

export const initialUserState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialUserState,

    // Load Users
    on(UserActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        error: null
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create User
    on(UserActions.createUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        loading: false,
        error: null
    })),
    on(UserActions.createUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update User
    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u),
        selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
        loading: false,
        error: null
    })),
    on(UserActions.updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete User
    on(UserActions.deleteUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users.filter(u => u.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        loading: false,
        error: null
    })),
    on(UserActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Select User
    on(UserActions.selectUser, (state, { user }) => ({
        ...state,
        selectedUser: user
    })),
    on(UserActions.clearSelectedUser, (state) => ({
        ...state,
        selectedUser: null
    })),

    // Clear Error
    on(UserActions.clearError, (state) => ({
        ...state,
        error: null
    }))
);
