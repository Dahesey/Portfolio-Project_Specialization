import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import './FinanceOverview.css'; // Add your custom styles here

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const ShowReports = () => {
  // Line chart data for Monthly Contributions
  const lineData = {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024', 'SEP 2024', 'OCT 2024',],
    datasets: [
      {
        label: 'Tithes',
        data: [1500, 1800, 1600, 1900, 2200, 2100, 2500, 2200],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Offerings',
        data: [500, 600, 550, 700, 750, 800, 900, 1100],
        borderColor: 'orange',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Welfare',
        data: [300, 400, 350, 450, 500, 480, 550, 750],
        borderColor: 'green',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Pledges',
        data: [700, 1000, 1200, 1300, 1400, 1600, 1800, 1900],
        borderColor: 'purple',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Pie chart data for Contribution Breakdown
  const pieData = {
    labels: ['Tithes', 'Offerings', 'Welfare', 'Pledges', 'Special Offerings'],
    datasets: [
      {
        data: [2500, 900, 550, 1800, 400],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#45a049', '#8e24aa'],
      },
    ],
  };

  return (
    <div className="finance-overview">
      <div className="performance-section">
        <h2>Monthly Financial Overview</h2>
        <div className="performance-chart">
          <Line data={lineData} />
        </div>
      </div>

      <div 
  className="contributions-breakdown" 
  style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    textAlign: 'center' 
  }}
>
  <h3>Contributions Breakdown</h3>
  <div className="pie-chart">
    <Pie data={pieData} />
  </div>
</div>


      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Total Collected</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-07-01</td>
              <td>Tithe</td>
              <td>$1500</td>
              <td>$2500</td>
            </tr>
            <tr>
              <td>2024-07-01</td>
              <td>Offering</td>
              <td>$900</td>
              <td>$900</td>
            </tr>
            <tr>
              <td>2024-07-01</td>
              <td>Pledge</td>
              <td>$1800</td>
              <td>$1800</td>
            </tr>
            <tr>
              <td>2024-07-01</td>
              <td>Special Offering</td>
              <td>$400</td>
              <td>$400</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <h3>Summary</h3>
        <p>This month, the church received a total of $6,150 from tithes, offerings, welfare, pledges, and special offerings. We are on track with our financial goals for the year.</p>
      </div>
    </div>
  );
};

export default ShowReports;
