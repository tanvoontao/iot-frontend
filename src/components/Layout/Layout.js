'use client';

import { useSelector } from 'react-redux';
import Alert from '@/components/Alert/Alert';
import Modal from '@/components/Modal/FormModal';

function Layout({ children }) {
  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state.alert);

  return (
    <div className="w-full position-relative ">

      {children}

      {
        state.show && (
          <Alert
            severity={state.severity}
            style={{
              position: 'fixed',
              right: 0,
              bottom: 0,
            }}
            className="min-w-fit m-3"
          >
            {state.message}
          </Alert>
        )
      }
      <Modal />
    </div>
  );
}

export default Layout;
