
async function Autorizacion(){

    try {
        const response = await fetch("http://localhost:4000/protected", {
          credentials: 'include',
        });

        if (!response.ok) {
          setTimeout(() => {
            window.location.href = '/';
          }, 100000);
          
          
        }
        const responseData = await response.json();
        //console.log('Success:', responseData);
        return(responseData)
      } catch (error) {
       // console.error('Error:', error);
        throw new Error('Sesion Expirada');
      }


}


  export default Autorizacion