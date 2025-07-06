import { createAction, props, on, createReducer, createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from './user.model';

// Entity Adapter Configuration
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

// Entity State Interface
export interface UserState extends EntityState<User> {
    loading: boolean;
    error: string | null;
    selectedUserId: string | null;
}

// Initial State using Entity Adapter
export const initialState: UserState = userAdapter.getInitialState({
    loading: false,
    error: null,
    selectedUserId: null
});

// Actions
export const addUser = createAction(
    "[User] Add User",
    props<{ name: string; age: number; email: string }>()
);

export const updateUser = createAction(
    "[User] Update User",
    props<{ id: string; changes: Partial<User> }>()
);

export const deleteUser = createAction(
    "[User] Delete User",
    props<{ id: string }>()
);

export const selectUser = createAction(
    "[User] Select User",
    props<{ id: string }>()
);

export const clearSelection = createAction(
    "[User] Clear Selection"
);

export const setLoading = createAction(
    "[User] Set Loading",
    props<{ loading: boolean }>()
);

export const setError = createAction(
    "[User] Set Error",
    props<{ error: string | null }>()
);

// Reducer with Entity Adapter
export const myreducer_facade_adapter = createReducer(
    initialState,
    on(addUser, (state, { name, age, email }) => {
        const newUser: User = {
            id: generateId(),
            name,
            age,
            email
        };
        return userAdapter.addOne(newUser, { ...state, loading: false });
    }),
    on(updateUser, (state, { id, changes }) =>
        userAdapter.updateOne({ id, changes }, state)
    ),
    on(deleteUser, (state, { id }) =>
        userAdapter.removeOne(id, state)
    ),
    on(selectUser, (state, { id }) => ({
        ...state,
        selectedUserId: id
    })),
    on(clearSelection, (state) => ({
        ...state,
        selectedUserId: null
    })),
    on(setLoading, (state, { loading }) => ({
        ...state,
        loading
    })),
    on(setError, (state, { error }) => ({
        ...state,
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

// Helper function to generate IDs
function generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}