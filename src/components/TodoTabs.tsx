import {
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import dayjs from 'dayjs';
import { a11yProps, TabPanel } from './TodoPanel';

const TodoTabs = () => {
  const matches = useMediaQuery('(min-width:600px)');
  const [searchText, setSearchText] = useState('');
  const allTodos = useAppSelector((state) => {
    return state.todoList.todos;
  });
  const todos = useMemo(() => {
    let temp = [...allTodos];
    return temp
      .sort((a, b) => {
        return dayjs(a.date, 'DD-MM-YYYY').isAfter(dayjs(b.date, 'DD-MM-YYYY'))
          ? 1
          : -1;
      })
      .filter((item) => {
        return (
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
  }, [allTodos, searchText]);
  const remainingTodos = useMemo(() => {
    return todos
      .filter((item) => item.status === 'REMAINING')
      .filter((item) => {
        return (
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
  }, [todos, searchText]);
  const completedTodos = useMemo(() => {
    return todos
      .filter((item) => item.status === 'COMPLETED')
      .filter((item) => {
        return (
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
  }, [todos, searchText]);
  const [value, setValue] = React.useState(0);
  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    [setValue],
  );
  const onSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  return (
    <Paper
      elevation={3}
      style={{
        width: matches ? '70%' : '100%',
        height: '100%',
        overflow: 'scroll',
      }}>
      <Stack padding={3}>
        <TextField
          value={searchText}
          onChange={onSearchInputChange}
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          placeholder="Search ..."
        />
      </Stack>

      <Tabs
        indicatorColor="primary"
        value={value}
        textColor="secondary"
        onChange={handleChange}
        aria-label="basic tabs example">
        <Tab label="ALL" {...a11yProps(0)} />
        <Tab label="REMAINING" {...a11yProps(1)} />
        <Tab label="COMPLETED" {...a11yProps(2)} />
      </Tabs>
      <TabPanel todos={todos} value={value} index={0} />
      <TabPanel todos={remainingTodos} value={value} index={1} />
      <TabPanel todos={completedTodos} value={value} index={2} />
    </Paper>
  );
};
export default TodoTabs;
