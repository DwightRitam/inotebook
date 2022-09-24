import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const Navbar = () => {
  let navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem('token')

    navigate("/login");
  }
  let location = useLocation();
  React.useEffect(() => {
    //  console.log( location.pathname)
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><span><lord-icon
          src="https://cdn.lordicon.com/puvaffet.json"
          trigger="morph"
          colors="primary:#121331,secondary:#08a88a"
          stroke="80"
          style={{ width: '40px' }}>
        </lord-icon></span> iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/"> <lord-icon
                src="https://cdn.lordicon.com/igpbsrza.json"
                trigger="morph"
                colors="primary:#121331"
                state="morph-1"
                style={{ width: '40px' }}>
              </lord-icon>
              </Link>
              {/* <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link> */}
            </li>
            <li className="nav-item">

              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">
                <lord-icon
                  src="https://cdn.lordicon.com/aixyixpa.json"
                  trigger="morph"
                  colors="primary:#121331"
                  style={{ width: '40px' }}>
                </lord-icon>
              </Link>
            </li>

          </ul>

          {!localStorage.getItem('token') ? <form >

            <Link to="/Login">
              <lord-icon
                src="https://cdn.lordicon.com/dklbhvrt.json"
                trigger="hover"
                colors="primary:#121331"
                style={{ width: '40px' }}
                title="login"
              >
              </lord-icon></Link>
            <Link to="/Signup">
              <lord-icon
                src="https://cdn.lordicon.com/hcuxerst.json"
                trigger="hover"
                colors="primary:#545454,secondary:#242424"
                stroke="95"
                scale="60"
                style={{ width: '40px' }}
                title="Sign-up"
                className="px-3">
              </lord-icon></Link>
          </form> : <lord-icon
            src="https://cdn.lordicon.com/pvbnjqea.json"
            trigger="hover"
            colors="primary:#121331"
            style={{ width: '40px' }}
            title="logout"
             onClick={logout} >
          </lord-icon>}
        </div>
      </div>
    </nav>
  )
}
