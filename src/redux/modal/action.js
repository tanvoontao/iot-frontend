import { setModal as setAction } from './reducer';
import { store } from '../store';

const setModal = (modal) => {
  store.dispatch(setAction(modal));
};

// eslint-disable-next-line import/prefer-default-export
export { setModal };
