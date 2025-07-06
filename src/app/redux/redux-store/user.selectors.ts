import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.model';

// Feature selector
export const selectUserFeature = createFeatureSelector<UserState>('userStore');

// Selectors
export const selectAllUsers = createSelector(
    selectUserFeature,
    (state: UserState) => state.users
);

export const selectUsersLoading = createSelector(
    selectUserFeature,
    (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
    selectUserFeature,
    (state: UserState) => state.error
);

export const selectSelectedUser = createSelector(
    selectUserFeature,
    (state: UserState) => state.selectedUser
);

export const selectUserById = (id: number) => createSelector(
    selectAllUsers,
    (users) => users.find(user => user.id === id)
);

export const selectUsersCount = createSelector(
    selectAllUsers,
    (users) => users.length
);

export const selectUsersByName = (nameFilter: string) => createSelector(
    selectAllUsers,
    (users) => users.filter(user =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
);
