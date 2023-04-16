/* eslint-disable import/no-extraneous-dependencies */
// https://github.com/michalsnik/aos/issues/574
// https://micku7zu.github.io/vanilla-tilt.js/
// https://codesandbox.io/s/n5ptm?file=/src/index.js

// import { Akshar } from '@next/font/google';
import { Container } from '@mui/material';
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
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Metatags from '@/components/Metatags/Metatags';
import DarkModeBtn from '@/components/Button/DarkModeBtn';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import axios from '@/config/apis';
import useAxios from '@/hooks/useAxios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to Flask server!');
});

socket.on('response', (data) => {
  console.log('Received response from Flask server:', data);
});

socket.emit('message', { text: 'Hello, Flask server!' });

// const inter = Akshar({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState({});
  const {
    response, error, loading, refetch,
  } = useAxios({
    axios,
    method: 'GET',
    url: '/data',
    requestConfig: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Temperature Data',
  //     },
  //   },
  // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  // const groupedData = response.reduce((acc, item) => {
  //   const minute = moment(item.timestamp).startOf('minute').format('YYYY-MM-DD HH:mm');
  //   if (!acc[minute]) {
  //     acc[minute] = { temperatureSum: item.temperature, count: 1 };
  //   } else {
  //     acc[minute].temperatureSum += item.temperature;
  //     acc[minute].count += 1;
  //   }
  //   return acc;
  // }, {});
  // const labels = Object.keys(groupedData).reverse();

  // const data = {
  //   labels: Object.keys(groupedData),
  //   datasets: [
  //     {
  //       label: 'Temperature',
  //       data: Object.values(groupedData).map((item) => item.temperatureSum / item.count),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <Metatags />

      <NavBar />
      <Container maxWidth="lg">
        <DarkModeBtn />
        <p>dsi</p>

        {/* <Line
          options={options}
          data={data}
        /> */}
      </Container>
      <Footer />
    </>
  );
}
