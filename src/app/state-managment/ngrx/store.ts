import { Action, createAction, createReducer, createSelector, on } from '@ngrx/store';
import { UserState } from './user.model';

// Define the app state interface
export interface AppState {
    counter: number;
    user: UserState;
}

// Actions
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

export const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, () => initialState)
);

// Selectors
export const selectCounter = (state: AppState) => state.counter;
export const selectCounterValue = createSelector(
    selectCounter,
    (counter) => counter
);
