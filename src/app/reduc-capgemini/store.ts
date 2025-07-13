import { createAction, createReducer, on, props } from '@ngrx/store';
import { Todo } from './user.model';

//initial state
export const initialState: Todo[] = [];
//action
export const addTask = createAction(
  '[Adding Task]',
  props<{ id: number; name: string; isCompleted: boolean }>()
);
export const updateTask = createAction('update Task', props<{ id: number }>());
export const deleteTask = createAction(
  '[delete Task]',
  props<{ id: number }>()
);

//reducer

export const myCapgeminiReducer = createReducer(
  initialState,
  on(addTask, (state, { id, name, isCompleted }) => [
    ...state,
    { id: Date.now(), name, isCompleted: false },
  ]),
  on(updateTask, (state, { id }) =>
    state.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    )
  ),
  on(deleteTask, (state, { id }) => state.filter((task) => task.id !== id))
);
