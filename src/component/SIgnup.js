import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SIgnup = () => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      navigate("/");

    }
    else {
      alert("fuck u")
    }

  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const [eye, seteye] = useState("password")
  const eyeclick = () => {
    if (eye === "password")
      seteye("text")
    else {
      seteye("password")
    }
  }
  return (
    <>
      <form onSubmit={handlesubmit} className="mb-3">
        <h1> HEy NEw USer !, create a account to take notes asap <span>
          <lord-icon
            src="https://cdn.lordicon.com/nobciafz.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            stroke="100"
            style={{ width: "50px", height: "50px" }}>
          </lord-icon></span></h1>
        <div className='shadow p-3 mb-2 bg-body rounded my-5'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="text" className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" value={credentials.name} name='name' />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} minLength={5} required aria-describedby="emailHelp" value={credentials.email} name='email' />
          </div>
          <div className="mb-3">
            <div className=" d-flex justify-content-between">

              <label htmlFor="password" className="form-label">Password</label>
              <lord-icon
                src="https://cdn.lordicon.com/zbopvjaq.json"
                trigger="hover"
                colors="primary:#121331,secondary:#08a88a"
                stroke="75"
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={eyeclick}
              >
              </lord-icon>
            </div>
            <input type={eye} className="form-control" onChange={onChange} id="password" name='password' value={credentials.password} minLength={5} required />
          </div>
          <div className="mb-3">
            
            <lord-icon
              src="https://cdn.lordicon.com/diyeocup.json"
              trigger="morph"
              colors="primary:#121331"
              style={{ width: '40px', cursor: "pointer", marginTop: "10px" }}
             onClick={handlesubmit}
              >
            </lord-icon>
            <p   style={{ cursor: "pointer", marginTop: "10px" ,paddingInline:'5px'}}
            onClick={handlesubmit}

            >SIgn In</p>
          </div>
        </div>
      </form>
    </>
  )
}
