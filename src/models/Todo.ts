export type Status = 'REMAINING' | 'COMPLETED';
export interface Todo {
  id: string;
  taskName: string;
  description: string;
  date: string;
  status: Status;
}

export interface TodoListState {
  todos: Todo[];
  loading: boolean;
}
export interface TodoStatusState {
  status: Status;
  id: string;
}
