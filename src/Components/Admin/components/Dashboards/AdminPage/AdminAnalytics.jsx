
import React from 'react';
import { Bar } from 'react-chartjs-2';

const AdminAnalytics = ({ analytics }) => (
  <div>
    <h2>Analytics</h2>
    <Bar
      data={{
        labels: ['Clients', 'Revenue'],
        datasets: [
          {
            label: 'Data',
            data: [analytics.total_clients, analytics.total_revenue],
            backgroundColor: ['blue', 'green'],
          },
        ],
      }}
    />
  </div>
);

export default AdminAnalytics;
    