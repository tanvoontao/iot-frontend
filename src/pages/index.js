/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// https://github.com/michalsnik/aos/issues/574
// https://micku7zu.github.io/vanilla-tilt.js/
// https://codesandbox.io/s/n5ptm?file=/src/index.js

import { Inter } from '@next/font/google';
import {
  Container, IconButton, Grid, Box,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useEffect, useState, useRef } from 'react';

import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HotelIcon from '@mui/icons-material/Hotel';
import { TbFall } from 'react-icons/tb';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import Metatags from '@/components/Metatags/Metatags';
import DarkModeBtn from '@/components/Button/DarkModeBtn';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import axios from '@/config/apis';
import useAxios from '@/hooks/useAxios';

import HealthRecord from '@/components/Section/HealthRecord';
import TemperatureChart from '@/components/Section/TemperatureChart';
import HeartRateChart from '@/components/Section/HeartRateChart';

import UserLayout from '@/components/Layout/UserLayout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const inter = Inter({ subsets: ['latin'] });

const containerStyles = {
  position: 'relative',
  height: '50vh', // Adjust this value as needed
  width: '100%',
};

export default function Home() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Data',
      },
    },
  };

  // const {
  //   response: record, error, loading, refetch,
  // } = useAxios({
  //   axios,
  //   method: 'GET',
  //   url: '/api/data/latest',
  //   requestConfig: {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });

  const {
    response, error2, loading2, refetch2,
  } = useAxios({
    axios,
    method: 'GET',
    url: '/api/data',
    requestConfig: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>{error2}</p>;

  const groupedData = response.reduce((acc, item) => {
    const minute = moment(item.timestamp).startOf('minute').format('YYYY-MM-DD HH:mm');
    if (!acc[minute]) {
      acc[minute] = { temperatureSum: item.temperature, count: 1 };
    } else {
      acc[minute].temperatureSum += item.temperature;
      acc[minute].count += 1;
    }
    return acc;
  }, {});
  const labels = Object.keys(groupedData).reverse();
  // Object.keys(groupedData)

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: Object.values(groupedData).reverse().map((item) => item.temperatureSum / item.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Metatags />

      <UserLayout>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <TemperatureChart />
          </Grid>
          <Grid item sm={6} xs={12}>
            <HeartRateChart />
          </Grid>
        </Grid>

        <br />
        <br />

        <HealthRecord />

      </UserLayout>
    </>
  );
}
