import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [crediantials, setCrediantials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: crediantials.email,
        password: crediantials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/Loginuser", {
      method: "Post",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: crediantials.email,
        password: crediantials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("enter valid credential");
    }

    if (json.success) {
      localStorage.setItem("userEmail", crediantials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCrediantials({
      ...crediantials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={crediantials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={crediantials.password}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your password with anyone else
            </div>
          </div>

          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/SignUp" className="m-3 btn btn-danger">
            {" "}
            i'm new User
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
