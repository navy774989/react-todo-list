import { useCallback, useState } from 'react';

interface useModalProps {
  isOpen?: boolean;
}
export const useModal = (props?: useModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(props?.isOpen ?? false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
