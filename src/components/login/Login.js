import { useNavigate, Navigate } from "react-router-dom";

import axios from "axios";
import swAlert from "@sweetalert/with-react";

function Login() {

    const navigate = useNavigate();
    
    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             
        if(email === "" || password === "") {
            swAlert(
               <div>
                    <h2>Los campos no pueden estar vacios</h2>
                    <p>Por favor complete los datos requeridos</p>
               </div>
            );
            return;
        }
        if(email !== "" && !validateEmail.test(email)) {
            swAlert(
                <h2>Debes escribir una dirección de correo electronico valida</h2>
            );
            return;
        }

        if(email !== "challenge@alkemy.org" || password !== "react") {
            swAlert(
                <h2>Credenciales invalidas</h2>
            );
            return;
        }

        axios.post("http://challenge-react.alkemy.org", {email, password})
        .then(res => {
            swAlert(<h2>Perfecto, ingresaste correctamente</h2>);
            console.log(res.data);
            const token = res.data.token;
            sessionStorage.setItem("token", token);
            navigate("/listado");
            
        })
        
    }

    let token = sessionStorage.getItem("token");

    return (
        <>  
        { token && <Navigate to="listado" />}
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label>
                <span>Correo Electronico: </span><br />
                <input type="text" name="email" />
                </label>
                <br />
                <label>
                <span>Contraseña: </span><br />
                <input type="password" name="password" />
                </label>
                <br />
                <br />
                <button className="btn btn-dark" type="submit">Ingresar</button>
            </form>
        </>
    )
}

export default Login;