import React from "react";

const EmployeeDashboard = ({ data }) => (
  <div>
    <h2>Welcome, {data.name}</h2>
    <div>
      <h3>Your Clients</h3>
      <ul>
        {data.clients.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3>Your Tasks</h3>
      <ul>
        {data.tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default EmployeeDashboard;
