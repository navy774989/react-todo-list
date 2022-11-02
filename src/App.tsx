import './App.css';
import { CircularProgress, Stack } from '@mui/material';
import ToDoListInput from './components/TodoListInput';
import TodoTabs from './components/TodoTabs';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { loadTodos } from './reducers/todoListReducer';

function App() {
  const loading = useAppSelector((state) => state.todoList.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);
  if (loading)
    return (
      <Stack
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}>
        <CircularProgress
          style={{
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      </Stack>
    );
  return (
    <Stack
      width={'100vw'}
      height={'100vh'}
      bgcolor={'#efeef4'}
      direction={'column'}
      justifyItems={'center'}
      alignItems={'center'}>
      <TodoTabs />
      <ToDoListInput />
    </Stack>
  );
}

export default App;
