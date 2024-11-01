import {useForm} from 'react-hook-form'
import imagenes from '../assets/images'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';



const LoginRegister = () => {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  

    const onSubmit = handleSubmit(async data=>{
        console.log(data)
        try{
            setError(null)

            const response = await fetch("http://localhost:4000/login",{
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
              if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
              const result = await response.json();
              setSuccess(true)
              console.log('Success:', result);
              setTimeout(() => {
                window.location.href = '/Dashboard';
              }, 5000);
              
        } catch(error) {
            console.error('Error:', error);
            setError(error.message); // Establecer el mensaje de error en el estado

        }
        
    
    })
    return(
        <>
        
        <header className="p-1 bg-[#faebd7]">
        <div className="flex  justify-between p-2">

        <div className='flex content-center'>

            <img src={imagenes.img1} width="290"  height="70" className='pb-2'  />
        </div>
        <div>
        <img src={imagenes.img2} height="60" width="90"/>
        </div>

        </div>   
        </header>


        <main className="xl:flex justify-between antialiased my-10 ">

       <section className='w-1/2 flex justify-center content-center'>

            <div className="xl:w-2/4">

            <h1 className='font-bold text-center '>Servicio Medico FTTC</h1>


                <form onSubmit={onSubmit} className='bg-[#fff] p-10 flex-col rounded-lg mt-10 shadow-2xl w-full 	'>

                   <h2 className='text-xl font-bold mb-3'> Inicio de sesion</h2>
                
                        <div>

                        <input className=" w-full p-2.5 my-2 border border-gray-300 rounded" type="text" 
                        placeholder="Usuario" required
                        {...register("username", {required:true})}
                        />
                  

                  
                        <input className=" w-full p-2.5 my-2 border border-gray-300 rounded" type="password" 
                        placeholder="Contraseña" required
                        {...register("password", {required:true})}
                        />
                            
                        </div>

                    <button className='w-1/2 p-2 bg-[#5c72b8] text-white border-none rounded mt-3 cursor-pointer' type="submit">Login</button>

                    <div className="font-bolder min-h-9 w-auto mt-3 flex content-center justify-center">
                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                    {success && <div style={{ color: 'green' }}>Login exitoso</div>}

                                    </div>

                </form>
                

            
                </div>

       </section>

       <section className='w-1/2 flex justify-center content-center' >
       <img src={imagenes.img3} alt="" />

       </section>


        </main>

        <footer className='bg-[#faebd7] min-h-20 flex justify-center content-center items-center bolder'>
            <span>Coordinacion de tecnologia FTTC</span>
        </footer>    
    
    </>


    )
}


export default LoginRegister