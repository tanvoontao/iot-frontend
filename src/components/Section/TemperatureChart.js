/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

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
import axios from '@/config/apis';
import useAxios from '@/hooks/useAxios';

const containerStyles = {
  position: 'relative',
  height: '50vh', // Adjust this value as needed
  width: '100%',
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

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

function TemperatureChart() {
  const {
    response, error, loading, refetch,
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

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Something wrong</p>;

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
    <div style={containerStyles}>
      <Line
        options={options}
        data={data}
      />
    </div>
  );
}

export default TemperatureChart;
