import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import axios from '@/config/apis';
import useAxiosFunc from '@/hooks/useAxiosFunc';
import { setAlert } from '@/redux/alert/action';
import { setModal } from '@/redux/modal/action';

function SystemSettingForm(props) {
  const { defaultValues } = props;

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();
  const {
    response, error, loading, axiosFetch,
  } = useAxiosFunc();

  const editData = async (formValues) => {
    const formData = {
      id: defaultValues.id,
      age: formValues.age,
      fall_detect_threshold: formValues.fall_detect_threshold,
      auto: formValues.auto,
    };

    await axiosFetch({
      axios,
      method: 'PUT',
      url: '/api/system-settings',
      requestConfig: {
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      },
    });
  };

  const onSubmit = async (formValues) => {
    if (defaultValues) {
      await editData(formValues);
    } else {
      // await createNew(formValues);
    }
  };

  useEffect(() => {
    if (!loading && !error && response) {
      const message = `You just ${defaultValues ? 'updated' : 'added'}  system settings. Click the refresh button. `;
      setModal({ type: null, data: null });
      setAlert({ show: true, message, severity: 'success' });
    } else if (!loading && error) {
      setAlert({ show: true, message: 'Something wrong', severity: 'error' });
    }
  }, [response, error, loading]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      className="my-5"
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center">
          {defaultValues ? 'Update ' : 'Create New '}
          Temperature Settings Form
        </Typography>

        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              id="age"
              name="age"
              label="👵 Age"
              defaultValue={defaultValues?.age}
              {...register('age')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              id="fall_detect_threshold"
              name="fall_detect_threshold"
              label="⚠️ Fall detect threshold"
              defaultValue={defaultValues?.fall_detect_threshold}
              {...register('fall_detect_threshold')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <TextField
              fullWidth
              required
              id="auto"
              name="auto"
              label="🔔 Buzzer Alarm Auto"
              defaultValue={defaultValues?.auto}
            /> */}
            <FormControl
              fullWidth
            >
              <InputLabel id="active">🔔 Buzzer Alarm Auto</InputLabel>
              <Select
                labelId="auto"
                defaultValue={(defaultValues) ? defaultValues.auto : 1}
                label="🔔 Buzzer Alarm Auto"
                inputProps={register('auto')}
              >
                <MenuItem
                  value={1}
                >
                  Yes
                </MenuItem>
                <MenuItem
                  value={0}
                >
                  No
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <br />

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            {defaultValues ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Container>
    </form>
  );
}

export default SystemSettingForm;
