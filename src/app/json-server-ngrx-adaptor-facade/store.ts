import { createAction, createReducer, props, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "./user.model";

// Entity Adapter Configuration
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

// Entity State Interface
export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

// Initial State using Entity Adapter
export const initialState: UserState = userAdapter.getInitialState({
  loading: false,
  error: null
});

// Actions for HTTP operations
export const loadUsers = createAction("[User] Load Users");
export const loadUsersSuccess = createAction(
  "[User] Load Users Success",
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  "[User] Load Users Failure",
  props<{ error: string }>()
);

export const addUser = createAction(
  "[User] Add User",
  props<{ name: string }>()
);
export const addUserSuccess = createAction(
  "[User] Add User Success",
  props<{ user: User }>()
);
export const addUserFailure = createAction(
  "[User] Add User Failure",
  props<{ error: string }>()
);

// Reducer with Entity Adapter
export const myJsonReducer = createReducer(
  initialState,
  // Load Users
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, { ...state, loading: false })
  ),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add User
  on(addUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(addUserSuccess, (state, { user }) =>
    userAdapter.addOne(user, { ...state, loading: false })
  ),
  on(addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

// Entity Adapter Selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = userAdapter.getSelectors();