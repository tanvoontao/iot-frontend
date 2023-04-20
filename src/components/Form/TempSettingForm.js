import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid,
  ButtonGroup,
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

function TempSettingForm(props) {
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
      hypothermia: formValues.hypothermia,
      mild_hypothermia: formValues.mild_hypothermia,
      normal: formValues.normal,
      mild_fever: formValues.mild_fever,
      fever: formValues.fever,
      hyperpyrexia: formValues.hyperpyrexia,
    };

    await axiosFetch({
      axios,
      method: 'PUT',
      url: '/api/temp-settings',
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
      const message = `You just ${defaultValues ? 'updated' : 'added'}  temperature settings. Click the refresh button. `;
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="hypothermia"
              name="hypothermia"
              label="❄️ Hypothermia Threshold"
              defaultValue={defaultValues?.hypothermia}
              {...register('hypothermia')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="mild_hypothermia"
              name="mild_hypothermia"
              label="🥶 Mild Hypothermia Threshold"
              defaultValue={defaultValues?.mild_hypothermia}
              {...register('mild_hypothermia')}
            />
          </Grid>
        </Grid>

        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="normal"
              name="normal"
              label="😊 Normal"
              defaultValue={defaultValues?.normal}
              {...register('normal')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="mild_fever"
              name="mild_fever"
              label="😓 Mild_fever"
              defaultValue={defaultValues?.mild_fever}
              {...register('mild_fever')}
            />
          </Grid>
        </Grid>

        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="fever"
              name="fever"
              label="🤒 Fever"
              defaultValue={defaultValues?.fever}
              {...register('fever')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="hyperpyrexia"
              name="hyperpyrexia"
              label="🔥 Hyperpyrexia"
              defaultValue={defaultValues?.hyperpyrexia}
              {...register('hyperpyrexia')}
            />
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            {defaultValues ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Container>
    </form>
  );
}

export default TempSettingForm;
