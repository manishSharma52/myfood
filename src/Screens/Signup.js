import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {

    const [crediantials, setCrediantials] = useState({name:"", email:'',password:"", geolocation:""})
    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log(JSON.stringify({name:crediantials.name, email:crediantials.email, password:crediantials.password,location: crediantials.geolocation}))
      const response = await fetch("http://localhost:5000/api/CreateUser",{
      method : 'Post',
      headers:{
        'content-type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({name: crediantials.name,email:crediantials.email,password:crediantials.password,location:crediantials.geolocation})
      })
      const json = await response.json()
      console.log(json)
      if (!json.success) {
        alert('enter valid credential')
      }
    }

    const onChange = (event)=>{
     setCrediantials({...crediantials,[event.target.name]:event.target.value})
    }
    return (
        <>
        <div className='container' >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <label htmlForfor="name" className="form-label">name</label>
                    <input type="text" className="form-control" name='name' value={crediantials.name}onChange={onChange}  />
                </div>
                <div className="mb-3">

                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={crediantials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'value={crediantials.password}onChange={onChange}  />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="address" className="form-control" name='geolocation'value={crediantials.geolocation} onChange={onChange}  />
                </div>

                <button type="submit" className=" m-3 btn btn-success">Submit</button>
                <Link to='/Login' className='m-3 btn btn-danger'> Already User</Link>
            </form>
            </div>
        </>
    )
}

export default Signup