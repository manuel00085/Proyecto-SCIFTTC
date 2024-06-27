

const DashboardProtec = () => {
    

        fetch("http://localhost:4000/protected",{
            credentials: 'include',
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
           
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        

    return(
      <h1>estas burda de protegido men</h1>
    )
}


export default DashboardProtec