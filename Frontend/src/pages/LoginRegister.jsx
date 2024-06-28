import Style from '../components/Css/Dashboard.module.css'
import {useForm} from 'react-hook-form'
import imagenes from '../assets/images'
const LoginRegister = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit(async data=>{
        console.log(data)
           fetch("http://localhost:4000/login",{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then( response => response.json())
          .then( data => {
            console.log('Success:', data);
            window.location.href = '/Dashboard'
            

          })
          .catch((error) => {
            console.error('Error:', error);
          });
    })
    return(
        <>
        
        <header>
        <div className={Style.headerGBV}>

        <div>
            <img src={imagenes.img1} height="50" width="300"/>
        </div>
        <div>
        <img src={imagenes.img2} alt="" height="60" width="90"/>
        </div>

        </div>   
        </header>

        <main>
        <div className={Style.sliceL}>
        <h1>Servicio Medico FTTC</h1>
        <div className={Style.LoginForm}>
            <form onSubmit={onSubmit}>
            <h2> Inicio de sesion</h2>
            
                <div className={Style.inputLogin}>
                    <input type="text" 
                    placeholder="Username" required
                    {...register("username", {required:true})}
                    />
                </div>
                <div className={Style.inputLogin}>
                    <input type="password" 
                    placeholder="Password" required
                    {...register("password", {required:true})}
                    />
                </div>
                <button type="submit">Login</button>

            </form>
    
        </div>

       </div>
       <img src={imagenes.img3} alt="" />

        </main>    
    
    </>


    )
}


export default LoginRegister