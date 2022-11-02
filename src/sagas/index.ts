import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { api } from '../apis';
import { RootState } from '../reducers/store';
import {
  loadTodos,
  loadTodoSucess,
  loadTodoFail,
  saveTodos,
  saveTodosSucess,
  saveTodosFail,
} from '../reducers/todoListReducer';
export const getTodos = (state: RootState) => state.todoList.todos;
export function* loadToDosSaga(): any {
  try {
    const { data } = yield call(api.getToDos);
    yield put(loadTodoSucess({ todos: data.data, loading: false }));
  } catch {
    yield put(loadTodoFail());
  }
}
export function* saveToDosSaga(): any {
  try {
    const todos = yield select(getTodos);
    yield call(api.saveToDos, todos);
    yield put(saveTodosSucess());
  } catch {
    yield put(saveTodosFail());
  }
}
export function* rootSaga() {
  yield all([
    takeLatest(loadTodos, loadToDosSaga),
    takeLatest(saveTodos, saveToDosSaga),
  ]);
}
