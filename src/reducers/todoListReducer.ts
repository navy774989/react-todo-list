import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoListState, TodoStatusState } from '../models/Todo';

const initialState: TodoListState = {
  todos: [],
  loading: true,
};
export const TodoListSlice = createSlice({
  name: 'todoListReducer',
  initialState,
  reducers: {
    addNewTask: (state, { payload }: PayloadAction<Todo>) => {
      state.todos.push(payload);
    },
    deleteTask: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((item) => item.id !== payload.id);
    },
    editTask: (state, { payload }: PayloadAction<Todo>) => {
      state.todos = state.todos.map((item) => {
        return item.id === payload.id ? { ...payload } : item;
      });
    },
    loadTodos: () => {},
    loadTodoSucess: (state, { payload }: PayloadAction<TodoListState>) => {
      state.todos = payload.todos;
      state.loading = payload.loading;
    },
    loadTodoFail: (state) => {
      state.loading = false;
    },
    updateTaskStatus: (state, { payload }: PayloadAction<TodoStatusState>) => {
      state.todos = state.todos.map((item) =>
        item.id === payload.id ? { ...item, status: payload.status } : item,
      );
    },
    saveTodos: (state) => {
      state.loading = true;
    },
    saveTodosSucess: (state) => {
      state.loading = false;
    },
    saveTodosFail: (state) => {
      state.loading = false;
    },
  },
});
export const {
  loadTodos,
  loadTodoFail,
  loadTodoSucess,
  saveTodos,
  saveTodosFail,
  saveTodosSucess,
  updateTaskStatus,
  addNewTask,
  deleteTask,
  editTask,
} = TodoListSlice.actions;
export default TodoListSlice.reducer;
