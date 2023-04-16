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
      text: 'Heart Rate',
    },
  },
};

function HeartRateChart() {
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
  if (error) return <p>Something wrong</p>;

  const groupedDataHeartRate = response.reduce((acc, item) => {
    const minute = moment(item.timestamp).startOf('minute').format('YYYY-MM-DD HH:mm');
    if (!acc[minute]) {
      acc[minute] = { heartRateSum: item.heart_rate, count: 1 };
    } else {
      acc[minute].heartRateSum += item.heart_rate;
      acc[minute].count += 1;
    }
    return acc;
  }, {});
  const labels = Object.keys(groupedDataHeartRate).reverse();
  // Object.keys(groupedData)

  const data = {
    labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: Object.values(groupedDataHeartRate).reverse().map((item) => item.heartRateSum / item.count),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
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

export default HeartRateChart;
