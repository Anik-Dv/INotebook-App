import React, { useState } from 'react';
//useNavigate hook.
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [Credentials, setCredentials] = useState({ email: "", password: "" });
    //call history hook,get localstorage to take auth token.
    let navigate = useNavigate();

    const HandleLogin = async (e) => {
        e.preventDefault();
        //API CALL Login Application
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //when Login is true then redirect to home page.
          //auth token save on localstorage 
            localStorage.setItem('token', json.authtoken);
            //call what is information to get login
            setCredentials({ email: Credentials.email, password: Credentials.password })
            props.showAlert("Account Logged in Successfuly", "success")
            //redirect of this link.
            navigate("/")
        }
        else{
            //when Login is false then show alert message
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    //call onChange funtion to when user change input then save it.
    const OnChange = (e)=>{
        setCredentials({...Credentials, [e.target.name]: e.target.value})
    }


    return (
        <>
            <div className='my-4'>
                <form onSubmit={HandleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={Credentials.email} onChange={OnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="current-password" className="form-label">Password</label>
                        <input type="current-password" className="form-control" id="password" onChange={OnChange} name='password' value={Credentials.password} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Password</label>
                    </div>
             <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login;
