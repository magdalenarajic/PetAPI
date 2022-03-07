import React, { useState } from "react";
import LoginForm from './components/LoginForm';
import './Admin.css';
import Apptwo from "./Apptwo.js";

function Appone(){
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email === adminUser.email && details.password === adminUser.password){
            console.log("Logged in!");
            setUser({
                
                email: details.email
            });
           
 
        }else{
            console.log("Details do not match!");
            setError("Details do not match!");
         
        }
    }

    const Logout = () =>{
        setUser({name: "", email: ""});
    }
    return (
        <div className="Appone">


            
         {(user.email !=="") ? (
            
         <div className="welcome">
            
             
            {Apptwo()}  
                   
                 
                 
                 <button onClick={Logout}>Logout</button>
         </div>
             
         ) : (
             <LoginForm Login={Login}  error={error} />
         )}
        </div>
    );
}
export default Appone;