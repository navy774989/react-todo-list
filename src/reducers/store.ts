import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoListReducer from "./todoListReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
