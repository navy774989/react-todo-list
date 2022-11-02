import { Stack } from "@mui/material";
import React, { FC } from "react";
import { Todo } from "../models/Todo";
import TodoItem from "./TodoItem";
import Empty from "./Empty";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  todos: Todo[];
}
export const TabPanel: FC<TabPanelProps> = ({ todos = [], value, index }) => {
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
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    style: {
      fontWeight: "600",
    },
  };
}
