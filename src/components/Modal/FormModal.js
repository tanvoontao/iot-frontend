/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
// import LeadershipForm from '@/components/Form/LeadershipForm';
// import ServiceForm from '@/components/Form/ServiceForm';
// import PortfolioForm from '@/components/Form/PortfolioForm';
import TempSettingForm from '@/components/Form/TempSettingForm';
import SystemSettingForm from '@/components/Form/SystemSettingForm';

import { setModal } from '@/redux/modal/action';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const components = {
  TempSettingForm,
  SystemSettingForm,
  // PortfolioForm,
};

function FormModal() {
  const modal = useSelector((state) => state.modal);
  const Form = components[modal.type];

  const handleClose = () => {
    setModal({ type: null, data: null });
  };

  return (
    Form
      ? (
        <Dialog
          fullScreen
          open
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Form
              </Typography>

            </Toolbar>
          </AppBar>

          <Form defaultValues={modal.data} />

        </Dialog>
      )
      : null
  );
}

export default FormModal;
