// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ProtectedComponent from '../components/Protected';


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleData = (responseData) => {
    setData(responseData);
  };

  const handleError = (errorMessage) => {
    
    setError(errorMessage);
   
  };

 

  return (
    <div>   
      <ProtectedComponent onData={handleData} onError={handleError} />
      <h1>Dashboard</h1>
   
    
    </div>
  );
};

export default Dashboard;