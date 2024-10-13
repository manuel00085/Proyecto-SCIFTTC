// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/DashboardComponent/Header";
import Sidebar from "../components/DashboardComponent/Sidebar";
import '../global.css';


import autorizacion from '../Api/auth';

const Dashboard = () => {
  const [usuario, setData] = useState(null); 
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await autorizacion(); 
        setData(result);
        console.log('Datos:', result); 
      } catch (error) {
        setError(error.message); 
        console.error('Error:', error); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    
  <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
    <Sidebar />
    <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-full overflow-y-scroll">
    <Header username={usuario &&(usuario.data.username)}/>
    <Outlet />
    </main>

    
  </div>

  );
  
};

export default Dashboard;


/*<div>
{isLoading && <p>Cargando...</p>}
{error && <p style={{ color: 'red' }}>{error}</p>}
{usuario &&(
  <div>
    <h2>Información del Usuario:</h2>
    <p><strong>Nombre de usuario:</strong> {usuario.data.username}</p>
    <p><strong>Id:</strong> {usuario.data.id}</p>
  </div>
)}
</div>*/
