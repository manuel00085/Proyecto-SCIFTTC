import Style from '../components/Css/Login.module.css'
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
        
        <header className={Style.Lheader}>
        <div className={Style.headerGBV}>

        <div>
            <img src={imagenes.img1} height="50" width="300"/>
        </div>
        <div>
        <img src={imagenes.img2} alt="" height="60" width="90"/>
        </div>

        </div>   
        </header>

        <main className={Style.Lmain}>
        <div className={Style.sliceL}>
        <h1>Servicio Medico FTTC</h1>
        <div className={Style.LoginForm}>
            <form onSubmit={onSubmit}>
            <h2> Inicio de sesion</h2>
            
                <div className={Style.inputLogin}>
                    <input type="text" 
                    placeholder="Usuario" required
                    {...register("username", {required:true})}
                    />
                </div>
                <div className={Style.inputLogin}>
                    <input type="password" 
                    placeholder="Contraseña" required
                    {...register("password", {required:true})}
                    />
                </div>
                <button type="submit">Login</button>

            </form>
            <div className={Style.alert}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Login exitoso</div>}

            </div>

    
        </div>

       </div>
       <img src={imagenes.img3} alt="" />

        </main>
        <footer>
            <span>Coordinacion de tecnologia FTTC</span>
            </footer>    
    
    </>


    )
}


export default LoginRegister