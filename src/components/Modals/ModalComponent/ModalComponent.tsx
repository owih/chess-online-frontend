import * as React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ModalName from '../../../types/app/Modal/modalName';
import { toggle } from '../../../store/reducers/ModalsSlice';
import ModalSize from '../../../types/app/Modal/modalSize';

interface Props {
  title: string,
  size?: ModalSize;
  children: React.ReactNode;
  modalName: ModalName;
}

export default function ModalComponent({
  title, children, modalName, size = ModalSize.NORMAL,
}: Props) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modals[modalName].isOpen);
  const handleClose = () => {
    dispatch(toggle(modalName));
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
      >
        <Box className={['modal-wrapper', `modal-wrapper_${size}`].join(' ')}>
          <Typography variant="h5">{title}</Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
