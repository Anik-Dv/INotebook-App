import React,{useState} from 'react';
//useNavigate hook.
import { useNavigate } from 'react-router-dom'

function SignUp(props) {

  const [createUser, setCreateUser] = useState({ name: "", email: "", password: "", cpassword: "" });

  //call history hook,get localstorage to take auth token.
    let navigate = useNavigate();

    const HandleSignup= async (e) => {
      //page not relode preventDefault meathod
        e.preventDefault();
        //make destuckcer component
        const {name, email, password} = createUser
        //API CALL SignUp Application
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json"
          },
            body: JSON.stringify({name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          //when signup is true then redirect to home page.
          //auth token save on localstorage 
          localStorage.setItem('token', json.authtoken);
          //call what is information to get signup
          setCreateUser({name, email, password})
          props.showAlert("Account Logged in Successfuly", "success")
          //redirect of this link.
          navigate("/")
      }
      else{
        //when signup is false then show alert message
        props.showAlert("Invalid Credentials", "danger");
      }
    }

    //call onChange funtion to when user change input then save it.
    const OnChange = (e)=>{
      setCreateUser({...createUser, [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className='container my-4'>
      <form className="row g-3 needs-validation" onSubmit={HandleSignup}>
          <label htmlFor="name" className="form-label">Type Your Name :</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">Full Name</span>
          <input type="text" className="form-control" id="name" name="name" value={createUser.name} onChange={OnChange} required/>
            <div className="valid-feedback">
              Looks good!
            </div>
        </div>
        
          <label htmlFor="email" className="form-label">Email :</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@Email</span>
            <input type="email" className="form-control" id="email" name="email" value={createUser.email} aria-describedby="inputGroupPrepend" onChange={OnChange} required/>
              <div className="invalid-feedback">
                Please Inter a valid Email Address.
          </div>
        </div>
          <label htmlFor="password" className="form-label">Password :</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="password">Password</span>
          <input type="current-password" className="form-control" id="password" name="password" value={createUser.password} onChange={OnChange} minLength="5" required/>
            <div className="invalid-feedback">
              Please provide a Strong Password.
            </div>
        </div>

          <label htmlFor="cpassword" className="form-label">Comfirm Password :</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">Comfirm Password</span>
          <input type="current-password" className="form-control" id="cpassword" name="cpassword" value={createUser.cpassword} onChange={OnChange} required/>
            <div className="invalid-feedback">
              Please provide a Strong Password.
            </div>
        </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox"  id="invalidCheck" required/>
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
          </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
      </div>

    </>

  );
}

export default SignUp;
