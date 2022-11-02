import { Fab, useMediaQuery } from '@mui/material';

import React, { useCallback } from 'react';
import { SaveAs, AddCircleOutline } from '@mui/icons-material';
import { useModal } from '../app/useModal';
import { useDispatch } from 'react-redux';
import { saveTodos } from '../reducers/todoListReducer';
import { TaskInputDialog } from './TaskInputDialog';

const ToDoListInput = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:600px)');
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
          background: '#7945f5',
          position: 'fixed',
          bottom: matches ? 60 : 20,
          right: matches ? 60 : 20,
        }}
        color="primary"
        aria-label="add">
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
          background: '#7945f5',
          position: 'fixed',
          bottom: matches ? 60 : 20,
          left: matches ? 60 : 20,
        }}
        color="primary"
        aria-label="save">
        <SaveAs
          style={{
            width: matches ? 40 : 30,
            height: matches ? 40 : 30,
          }}
        />
      </Fab>
      {isOpen && <TaskInputDialog mode="create" handleClose={onClose} />}
    </>
  );
};

export default ToDoListInput;
