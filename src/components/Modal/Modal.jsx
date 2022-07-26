import { useEffect } from 'react';

import { Overlay, ModalWindow } from './Modal.styled';

const Modal = ({ onClouse, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape' || event.target.tagName === 'DIV') {
        onClouse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleKeyDown);
  }, [onClouse]);

  return (
    <Overlay>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>
  );
};

export default Modal;
