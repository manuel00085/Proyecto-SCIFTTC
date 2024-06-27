
import {useForm} from 'react-hook-form'
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
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" 
                        placeholder="Username" required
                        {...register("username", {required:true})}
                        />
                    </div>
                    <div className="input-box">
                        <input type="password" 
                        placeholder="Password" required
                        {...register("password", {required:true})}
                        />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Recordar contraseña</label>
                        <a href="#">Olvide Contraseña</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>No tienes Cuenta?
                            <a href="#">Registrate</a>
                        </p>

                    </div>
                </form>

            </div>

        </div>
    )
}


export default LoginRegister