
async function Autorizacion(){

    try {
        const response = await fetch("http://localhost:4000/protected", {
          credentials: 'include',
        });

        if (!response.ok) {
          alert("Sesion Expirada")
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
          
          
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