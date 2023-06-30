import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

  const { socket } = useContext( SocketContext );
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on('current-bands', (data) => { 
            setBands(data);
            });

        return () => socket.off('current-bands');
  }, [socket])
  

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Las más votadas',
          },
        },
      };
      
    const labels = bands.map((band) => band.name);
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Bandas',
            data: bands.map((band) => band.votes),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
          },
        //   {
        //     label: 'Dataset 2',
        //     data: labels.map(() => 5),
        //     borderColor: 'rgb(255, 99, 132)',
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //   },
        ],
      };

  return (
    <Bar options={options} data={data} />
  )
}
        