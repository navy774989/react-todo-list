import './App.css';
import { Stack } from '@mui/material';
import ToDoListInput from './components/TodoListInput';
import TodoTabs from './components/TodoTabs';

function App() {
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
