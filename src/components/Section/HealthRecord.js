/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton, Grid } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { TbFall } from 'react-icons/tb';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import axios from '@/config/apis';
import useAxios from '@/hooks/useAxios';

const getTempCondition = (temp) => {
  if (temp <= 35) {
    return 'Hypothermia';
  }
  if (temp >= 36 && temp < 38) {
    return 'Normal Body Temperature';
  }
  if (temp >= 38 && temp < 40) {
    return 'Fever';
  }
  if (temp >= 40) {
    return 'Hyperpyrexia';
  }
  return '';
};

const getHRCondition = (hr) => {
  if (hr === 0) {
    return '0 bpm, Cardiac Arrest or Sensor Error';
  }
  if (hr < 60) {
    return 'Bradycardia (low heart rate)';
  }
  if (hr >= 60 && hr < 100) {
    return 'Normal heart rate for elderly';
  }
  if (hr >= 100) {
    return 'Tachycardia (high heart rate)';
  }
  return '';
};

const isTempAbnormal = (temp) => (temp <= 35 || temp >= 38);
const isHRAbnormal = (hr) => {
  if (hr === 0 || hr < 60 || hr >= 100) {
    return true;
  }
  return false;
};

function HealthRecord() {
  const {
    response: record, error, loading, refetch,
  } = useAxios({
    axios,
    method: 'GET',
    url: '/api/data/latest',
    requestConfig: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const getIcon = () => {
    if (record.fall_detect) {
      return <TbFall size={300} />;
    }
    if (!record.motion_detect) {
      return <AccessibleIcon sx={{ fontSize: '300px' }} />;
    }
    return <AccessibleForwardIcon sx={{ fontSize: '300px' }} />;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* Content for Temperature */}
            <div className="flex items-center w-full">
              <IconButton
                size="large"
                color="primary"
                sx={{ fontSize: '2rem' }}
              >
                <ThermostatIcon />
              </IconButton>
              <div className="ml-3">
                <p>
                  <strong>Temperature: </strong>
                  <code className={isTempAbnormal(record.temperature) ? 'text-red-600' : 'text-green-600'}>
                    {record.temperature}
                    °C
                  </code>
                </p>
                <p>
                  <strong>Status: </strong>
                  <code>{getTempCondition(record.temperature)}</code>
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {/* Content for Heart Rate */}
            <div className="flex items-center w-full">
              <IconButton
                size="large"
                color="primary"
                sx={{ fontSize: '2rem' }}
              >
                <MonitorHeartIcon />
              </IconButton>
              <div className="ml-3">
                <p>
                  <strong>Heart Rate: </strong>
                  {' '}
                  <code className={isHRAbnormal(record.heart_rate) ? 'text-red-600' : 'text-green-600'}>
                    {record.heart_rate}
                    bmp
                  </code>
                </p>
                <p>
                  <strong>Status: </strong>
                  <code>{getHRCondition(record.temperature)}</code>
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {/* Content for Motion */}
            <div className="flex items-center w-full">
              <IconButton
                size="large"
                color="primary"
                sx={{ fontSize: '2rem' }}
              >
                <SportsGymnasticsIcon />
              </IconButton>
              <div className="ml-3">
                <p>
                  <strong>Motion: </strong>
                  <code className="text-green-600">{record.motion_detect ? 'Active' : 'Inactive'}</code>
                </p>
                <p style={{ fontSize: '0.8rem' }}>
                  The motion detection system is currently active and monitoring for any unusual movements.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {/* Content for Fall Detection */}
            <div className="flex items-center w-full">
              <IconButton
                size="large"
                color="primary"
                sx={{ fontSize: '2rem' }}
              >
                <TbFall />
              </IconButton>
              <div className="ml-3">
                <p>
                  <strong>Fall Detection: </strong>
                  <code className={record.fall_detect ? 'text-red-600' : 'text-green-600'}>
                    {record.fall_detect ? 'Fall Detected' : 'No fall detected'}
                  </code>
                </p>
                <p style={{ fontSize: '0.8rem' }}>
                  The fall detection system has detected a fall and is currently alerting the caregivers.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={7} container justifyContent="center" alignItems="center">
        <IconButton
          color="primary"
          sx={record.fall_detect ? { color: 'red' } : {}}
        >
          {getIcon()}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default HealthRecord;
