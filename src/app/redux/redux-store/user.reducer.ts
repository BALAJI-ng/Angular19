import { createReducer, on } from '@ngrx/store';
import { UserState, User } from './user.model';
import * as UserActions from './user.actions';

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    selectedUser: null
};

export const userReducer = createReducer(
    initialState,

    // Add User
    on(UserActions.addUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(UserActions.addUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, { ...user, id: generateId(state.users) }],
        loading: false,
        error: null
    })),

    on(UserActions.addUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

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

    // Update User
    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    //  users: [],
    // loading: false,
    // error: null,
    // selectedUser: null

    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u),
        loading: false,
        error: null,
        selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser
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
        loading: false,
        error: null,
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser
    })),

    //  users: [],
    // loading: false,
    // error: null,
    // selectedUser: null

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

    // Reset State
    on(UserActions.resetUserState, () => initialState)
);

// Helper function to generate unique IDs
function generateId(users: User[]): number {
    if (users.length === 0) return 1;
    return Math.max(...users.map(u => u.id || 0)) + 1;
}
