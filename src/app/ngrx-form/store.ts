import { createAction, createReducer, on, props, createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserForm {
    name: string;
    age: number;
    email: string;
    id?: number;
}

export interface FormState {
    form: UserForm;
    loading: boolean;
    error: string | null;
    lastApiResponse: any;
    submissionHistory: UserForm[];
}

// Initial state
export const initialFormState: FormState = {
    form: {
        name: '',
        age: 0,
        email: ''
    },
    loading: false,
    error: null,
    lastApiResponse: null,
    submissionHistory: []
};

// Form Actions
export const onNameUpdate = createAction("[Form] Update Name", props<{ name: string }>());
export const onEmailUpdate = createAction("[Form] Update Email", props<{ email: string }>());
export const onAgeUpdate = createAction("[Form] Update Age", props<{ age: number }>());

// API Actions
export const submitFormStart = createAction("[API] Submit Form Start");
export const submitFormSuccess = createAction("[API] Submit Form Success", props<{ response: any }>());
export const submitFormFailure = createAction("[API] Submit Form Failure", props<{ error: string }>());
export const clearForm = createAction("[Form] Clear Form");
export const loadUsersStart = createAction("[API] Load Users Start");
export const loadUsersSuccess = createAction("[API] Load Users Success", props<{ users: UserForm[] }>());

// Reducer
export const formReducer = createReducer(
    initialFormState,
    on(onNameUpdate, (state, { name }) => ({
        ...state,
        form: { ...state.form, name }
    })),
    on(onEmailUpdate, (state, { email }) => ({
        ...state,
        form: { ...state.form, email }
    })),
    on(onAgeUpdate, (state, { age }) => ({
        ...state,
        form: { ...state.form, age }
    })),
    on(submitFormStart, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(submitFormSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        lastApiResponse: response,
        submissionHistory: [...state.submissionHistory, state.form],
        form: { name: '', age: 0, email: '' } // Clear form after successful submission
    })),
    on(submitFormFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(clearForm, (state) => ({
        ...state,
        form: { name: '', age: 0, email: '' },
        error: null
    })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        submissionHistory: users
    }))
);

// Selectors
export const selectFormState = createFeatureSelector<FormState>('userForm');
export const selectForm = createSelector(selectFormState, state => state.form);
export const selectName = createSelector(selectFormState, state => state.form.name);
export const selectEmail = createSelector(selectFormState, state => state.form.email);
export const selectAge = createSelector(selectFormState, state => state.form.age);
export const selectLoading = createSelector(selectFormState, state => state.loading);
export const selectError = createSelector(selectFormState, state => state.error);
export const selectLastApiResponse = createSelector(selectFormState, state => state.lastApiResponse);
export const selectSubmissionHistory = createSelector(selectFormState, state => state.submissionHistory);