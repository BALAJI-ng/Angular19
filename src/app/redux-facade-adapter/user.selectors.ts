import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, selectAll, selectEntities, selectIds, selectTotal } from "./store";

// Feature Selector
export const selectUserState = createFeatureSelector<UserState>('anyName');

// Entity Adapter Selectors
export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectUserIds = createSelector(
  selectUserState,
  selectIds
);

export const selectUserTotal = createSelector(
  selectUserState,
  selectTotal
);

// Custom Selectors
export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Advanced Selectors
export const selectUsersByAge = createSelector(
  selectAllUsers,
  (users) => users.sort((a, b) => a.age - b.age)
);

export const selectUsersByName = createSelector(
  selectAllUsers,
  (users) => users.sort((a, b) => a.name.localeCompare(b.name))
);

export const selectUsersCount = createSelector(
  selectAllUsers,
  (users) => users.length
);

export const selectUserByEmail = (email: string) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user.email === email)
);
