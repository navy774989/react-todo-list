import { Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { FC, useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Dialog } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNewTask, editTask } from '../reducers/todoListReducer';
import * as uuid from 'uuid';

type TaskInputDialogDefaultProps =
  | TaskInputDialogEditProps
  | TaskInputDialogCreateProps;
interface TaskInputDialogCreateProps {
  handleClose: () => void;
  mode: 'create';
}
interface TaskInputDialogEditProps {
  handleClose: () => void;
  id: string;
  mode: 'edit';
  taskName: string;
  description: string;
  date: string;
}

export const TaskInputDialog: FC<TaskInputDialogDefaultProps> = (props) => {
  const { handleClose, mode } = props;
  const dispatch = useDispatch();
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(
    mode === 'edit' ? dayjs(props.date, 'DD-MM-YYYY') : dayjs(),
  );
  const id = props.mode === 'edit' ? props.id : undefined;
  const [taskName, setTaskName] = useState(
    mode === 'edit' ? props?.taskName : '',
  );
  const [description, setDescription] = useState(
    mode === 'edit' ? props?.description : '',
  );
  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      setDateValue(newValue);
    },
    [setDateValue],
  );
  const onTaskNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value);
    },
    [setTaskName],
  );
  const onDescriptionInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    [setDescription],
  );
  const onAddNewTask = useCallback(() => {
    dispatch(
      addNewTask({
        id: uuid.v4(),
        taskName: taskName,
        description: description,
        date: datevalue?.format('DD/MM/YYYY')!,
        status: 'REMAINING',
      }),
    );
    handleClose();
  }, [taskName, description, datevalue, handleClose, dispatch]);
  const onEditTask = useCallback(() => {
    if (mode === 'edit') {
      dispatch(
        editTask({
          id: id!,
          taskName: taskName,
          description: description,
          date: datevalue?.format('DD/MM/YYYY')!,
          status: 'REMAINING',
        }),
      );
    }
    handleClose();
  }, [taskName, description, datevalue, handleClose, dispatch, mode, id]);
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
          value={description}
          placeholder="Description"
        />
        <DatePicker
          disablePast
          label="Due Date"
          openTo="year"
          views={['year', 'month', 'day']}
          value={datevalue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Stack direction={'row'} mt={3} justifyContent={'center'}>
          <Button
            onClick={handleClose}
            style={{
              marginRight: 10,
            }}
            variant="outlined">
            Cancel
          </Button>
          {mode === 'create' ? (
            <Button
              disabled={!taskName}
              onClick={onAddNewTask}
              variant="contained">
              Add Task
            </Button>
          ) : (
            <Button
              disabled={!taskName}
              onClick={onEditTask}
              variant="contained">
              Update Task
            </Button>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};
