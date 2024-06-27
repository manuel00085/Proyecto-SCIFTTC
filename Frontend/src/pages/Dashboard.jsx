import Style from '../components/Css/Dashboard.module.css'

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
      <h1 className={Style.hola}>Verificado y protegido </h1>
    )
}


export default DashboardProtec