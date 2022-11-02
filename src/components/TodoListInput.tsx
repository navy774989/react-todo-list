import { Button, Fab, Stack, TextField, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import React, { FC, useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Dialog } from "@mui/material";
import { SaveAs, AddCircleOutline } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useModal } from "../app/useModal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch } from "react-redux";
import { addNewTask, saveTodos } from "../reducers/todoListReducer";
import * as uuid from "uuid";
const ToDoListInput = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  const { isOpen, onOpen, onClose } = useModal();
  const saveAll = useCallback(() => {
    dispatch(saveTodos());
  }, [dispatch]);
  return (
    <>
      <Fab
        onClick={onOpen}
        style={{
          width: matches ? 100 : 60,
          height: matches ? 100 : 60,
          background: "#7945f5",
          position: "fixed",
          bottom: matches ? 60 : 20,
          right: matches ? 60 : 20,
        }}
        color="primary"
        aria-label="add"
      >
        <AddCircleOutline
          style={{
            width: matches ? 40 : 30,
            height: matches ? 40 : 30,
          }}
        />
      </Fab>
      <Fab
        onClick={saveAll}
        style={{
          width: matches ? 100 : 60,
          height: matches ? 100 : 60,
          background: "#7945f5",
          position: "fixed",
          bottom: matches ? 60 : 20,
          left: matches ? 60 : 20,
        }}
        color="primary"
        aria-label="save"
      >
        <SaveAs
          style={{
            width: matches ? 40 : 30,
            height: matches ? 40 : 30,
          }}
        />
      </Fab>
      {isOpen && <TaskInputDialog handleClose={onClose} />}
    </>
  );
};
interface TaskInputDialogProps {
  handleClose: () => void;
}
const TaskInputDialog: FC<TaskInputDialogProps> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const handleChange = useCallback(
    (newValue: Dayjs | null) => {
      setValue(newValue);
    },
    [setValue]
  );
  const onTaskNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value);
    },
    [setTaskName]
  );
  const onDescriptionInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );
  const onAddNewTask = useCallback(() => {
    dispatch(
      addNewTask({
        id: uuid.v4(),
        taskName: taskName,
        description: description,
        date: value?.format("DD/MM/YYYY")!,
        status: "REMAINING",
      })
    );
    handleClose();
  }, [taskName, description, value, handleClose, dispatch]);
  return (
    <Dialog fullWidth onClose={handleClose} open={true}>
      <Stack padding={4}>
        <TextField
          style={{
            marginBottom: 15,
          }}
          onChange={onTaskNameInputChange}
          value={taskName}
          placeholder="Task name here..."
        />
        <TextField
          style={{
            marginBottom: 15,
          }}
          onChange={onDescriptionInputChange}
          multiline
          fullWidth
          placeholder="Description"
        />
        <DatePicker
          disablePast
          label="Due Date"
          openTo="year"
          views={["year", "month", "day"]}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Stack direction={"row"} mt={3} justifyContent={"center"}>
          <Button
            onClick={handleClose}
            style={{
              marginRight: 10,
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={!taskName}
            onClick={onAddNewTask}
            variant="contained"
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default ToDoListInput;
