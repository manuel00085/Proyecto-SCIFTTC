// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/protected", {
          credentials: 'include',
        });

        if (!response.ok) {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
          throw new Error('Sesion Expirada');
          
        }

        const responseData = await response.json();
        setData(responseData);
        console.log('Success:', responseData);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Vacío como dependencia para que se ejecute solo una vez al montar el componente

  return (
    <div>
      <h2>Protected Component</h2>
      {data && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default ProtectedComponent;