import Modal from './modal';
import ModalName from './modalName';

type ModalsStore = {
  [key in ModalName]: Modal;
};

export default ModalsStore;
