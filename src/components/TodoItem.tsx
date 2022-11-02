import { Button, Checkbox, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useCallback, useMemo } from "react";
import { Todo } from "../types/Todo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { deleteTask, updateTaskStatus } from "../reducers/todoListReducer";
import { useAppDispatch } from "../app/hooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";
import { TaskInputDialog } from "./TodoListInput";
import { useModal } from "../app/useModal";
interface TodoItemProps {
  todoData: Todo;
}
const label = { inputProps: { "aria-label": "Checkbox" } };
const TodoItem: FC<TodoItemProps> = ({ todoData }) => {
  const { isOpen, onClose, onOpen } = useModal();
  const dispatch = useAppDispatch();
  const isCompleted = useMemo(() => {
    return todoData.status === "COMPLETED";
  }, [todoData.status]);
  const isUrgent = useMemo(() => {
    if (
      !isCompleted &&
      dayjs(todoData.date, "DD/MM/YYYY").diff(dayjs(), "day") < 3
    ) {
      return true;
    }
    return false;
  }, [isCompleted, todoData.date]);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskStatus({
          id: todoData.id,
          status: event.target.checked ? "COMPLETED" : "REMAINING",
        })
      );
    },
    [todoData.id, dispatch]
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      switch (event.detail) {
        case 2: {
          onOpen();
          break;
        }
        default: {
          break;
        }
      }
    },
    [onOpen]
  );

  const onDeleteTask = useCallback(() => {
    dispatch(
      deleteTask({
        id: todoData.id,
      })
    );
  }, [todoData.id, dispatch]);
  return (
    <>
      <Button
        onClick={handleClick}
        style={{
          backgroundColor: isUrgent ? "#ffc9bb" : "white",
          borderBlockWidth: 1,
          borderBottomColor: "#dcdbd9",
        }}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          pb={3}
          pr={3}
          alignItems={"start"}
        >
          <Checkbox
            size="small"
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            onChange={onChange}
            {...label}
            checked={todoData.status === "COMPLETED"}
          />
          <Stack direction={"column"}>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                style={{
                  textDecorationLine: isCompleted ? "line-through" : "none",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                }}
                color={isCompleted ? "gray" : "black"}
                fontSize={14}
                my={1}
                textAlign={"start"}
                variant="h6"
              >
                {todoData.taskName}
              </Typography>
              <Stack>
                <Button onClick={onDeleteTask} component="span">
                  <DeleteOutlineIcon />
                </Button>
              </Stack>
            </Stack>
            <Typography
              style={{
                textDecorationLine: isCompleted ? "line-through" : "none",
                wordWrap: "break-word",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              }}
              fontSize={12}
              textAlign={"start"}
              color={isCompleted ? "gray" : "#abadc2"}
              variant="body1"
            >
              {todoData.description}
            </Typography>
            <Stack direction={"row"} pt={2}>
              <CalendarMonthIcon fontSize={"small"} />
              <Typography
                style={{
                  textDecorationLine: isCompleted ? "line-through" : "none",
                  marginLeft: 10,
                }}
                fontSize={12}
                textAlign={"start"}
                color={isCompleted ? "gray" : "#abadc2"}
                variant="body1"
              >
                {todoData.date}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Button>
      {isOpen && (
        <TaskInputDialog
          date={todoData.date}
          taskName={todoData?.taskName}
          description={todoData?.description}
          id={todoData.id}
          mode="edit"
          handleClose={onClose}
        />
      )}
    </>
  );
};
export default TodoItem;
