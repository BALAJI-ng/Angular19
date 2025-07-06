import { createAction, createReducer, on, props } from "@ngrx/store";
import { User } from '../user.model';

export const initialState: User[] = [];

// Create Action (Fixed: removed extra parentheses)
export const addUser = createAction(
    "[Adding User] Creating User",
    props<{ name: string; email: string }>()
);

// Create Reducer
export const simpleUserReducer = createReducer(
    initialState,
    on(addUser, (state, { name, email }) => [...state, { name, email }])
);

