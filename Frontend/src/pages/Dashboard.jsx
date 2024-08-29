// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/DashboardComponent/Header";
import Sidebar from "../components/DashboardComponent/Sidebar";
import '../global.css';


import autorizacion from '../Api/auth';

const Dashboard = () => {
  const [usuario, setData] = useState(null); // Estado para almacenar los datos
  const [error, setError] = useState(null); // Estado para almacenar los errores
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await autorizacion(); // Llamada a la función de autorización
        setData(result); // Almacenar los datos en el estado
        console.log('Datos:', result); // Imprimir datos en consola
      } catch (error) {
        setError(error.message); // Almacenar el mensaje de error en el estado
        console.error('Error:', error); // Imprimir error en consola
      } finally {
        setIsLoading(false); // Indicar que la carga ha terminado
      }
    };

    fetchData(); // Llamar a la función de fetchData cuando el componente se monte
  }, []); // Vacío como dependencia para que se ejecute solo una vez al montar el componente

  return (
    
  <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
    <Sidebar />
    <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
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
