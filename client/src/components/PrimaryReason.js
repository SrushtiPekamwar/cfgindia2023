// import React, { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js';

// // Register necessary scale modules
// Chart.register(...registerables);

// const PrimaryReason = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Create the chart instance
//     const myChart = new Chart(chartRef.current, {
//       type: 'bar',
//       data: {
//         labels: ['Seeking information about volunteering opportunities', 'Seeking information about donation options', 'Exploring the organization and its mission', 'Other'],
//         datasets: [
//           {
//             label: 'Number of votes',
//             data: [12, 19, 3, 5],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     // Clean up the chart instance on component unmount
//     return () => {
//       myChart.destroy();
//     };
//   }, []);

//   return <canvas ref={chartRef} style={{ width: '100px', height: '100px' }} />;
// };

// export default PrimaryReason;




import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// Register necessary scale modules
Chart.register(...registerables);

const MyChart = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/survey/result');
        const data = await response.json();

        const awareOptions = [
          'Seeking information about volunteering opportunities',
          'Seeking information about donation options',
          'Exploring the organization and its mission',
          'Other'
        ];
        const awareOptionsDisplay = [
          'Volunteering',
          'About donation',
          'Organization',
          'Other'
        ];

        const counts = awareOptions.map(option => {
          const count = data.reduce((accumulator, obj) => {
            if (obj.PrimaryReason === option) {
              return accumulator + 1;
            }
            return accumulator;
          }, 0);
          return count;
        });

        setChartData({ labels: awareOptionsDisplay, data: counts });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartData.labels.length === 0) return;

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: '# of People',
            data: chartData.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
            precision:0 // Set the step size for the y-axis ticks
          },
        },
      },
    });

    // Clean up the chart instance on component unmount
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return <div style={{ width: '600px', height: '300px' }}>
  <canvas ref={chartRef}/>;
  </div>
};

export default MyChart;