import React,{useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";


const Navber = ()=> {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  const handleLogout= ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link  className="navbar-brand" to="/">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?'active':''}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            
            {!localStorage.getItem('token')?<div className="mx-2">
              <Link className="btn btn-outline-success mx-2" to="/signup">Signup</Link>
              <Link className="btn btn-outline-success" to="/login">Login</Link>
              </div> :
              <button className="btn btn-outline-success" onClick={handleLogout}>LogOut</button>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navber;
