import {
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadTodos } from "../reducers/todoListReducer";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import Empty from "./Empty";
import dayjs from "dayjs";
const TodoTabs = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const allTodos = useAppSelector((state) => {
    return state.todoList.todos;
  });
  const todos = useMemo(() => {
    let temp = [...allTodos];
    return temp
      .sort((a, b) => {
        return dayjs(a.date, "DD-MM-YYYY").isAfter(dayjs(b.date, "DD-MM-YYYY"))
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
      .filter((item) => item.status === "REMAINING")
      .filter((item) => {
        return (
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
  }, [todos, searchText]);
  const completedTodos = useMemo(() => {
    return todos
      .filter((item) => item.status === "COMPLETED")
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
    [setValue]
  );
  const onSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setValue]
  );

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);
  return (
    <Paper
      elevation={3}
      style={{
        width: matches ? "70%" : "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
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
        aria-label="basic tabs example"
      >
        <Tab label="ALL" {...a11yProps(0)} />
        <Tab label="REMAINING" {...a11yProps(1)} />
        <Tab label="COMPLETED" {...a11yProps(2)} />
      </Tabs>
      <TabPanel todos={todos} value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel todos={remainingTodos} value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel todos={completedTodos} value={value} index={2}>
        Item Three
      </TabPanel>
    </Paper>
  );
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  todos: Todo[];
}
const TabPanel: FC<TabPanelProps> = ({ todos = [], value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Stack>
          {todos.length > 0 &&
            todos?.map((item) => {
              return <TodoItem key={item.id} todoData={item} />;
            })}
          {todos.length === 0 && <Empty />}
        </Stack>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    style: {
      fontWeight: "600",
    },
  };
}
export default TodoTabs;
