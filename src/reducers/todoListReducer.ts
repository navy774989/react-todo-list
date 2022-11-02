import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/Todo";
export interface TodoListState {
  todos: Todo[];
}
interface TodoStatusState {
  status: "REMAINING" | "COMPLETED";
  id: string;
}
const initialState: TodoListState = {
  todos: [],
};
export const TodoListSlice = createSlice({
  name: "todoListReducer",
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
    loadTodos: (state) => {},
    loadTodoSucess: (state, { payload }: PayloadAction<TodoListState>) => {
      state.todos = payload.todos;
    },
    updateTaskStatus: (state, { payload }: PayloadAction<TodoStatusState>) => {
      state.todos = state.todos.map((item) =>
        item.id === payload.id ? { ...item, status: payload.status } : item
      );
    },
    saveTodos: () => {},
    saveTodosSucess: () => {},
    saveTodosFail: () => {},
    loadTodoFail: () => {},
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
