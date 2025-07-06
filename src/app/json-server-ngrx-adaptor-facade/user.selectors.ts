import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, selectAll, selectEntities, selectIds, selectTotal } from "./store";

// Feature Selector
export const selectUserState = createFeatureSelector<UserState>('jsonUsers');

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

// Advanced Selectors
export const selectUsersCount = createSelector(
  selectAllUsers,
  (users) => users.length
);

export const selectUserByName = (name: string) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user.name === name)
);
