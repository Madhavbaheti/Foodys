import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [info, setinfo] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const Handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        password: info.password,
        location: info.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };
  const handleChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={Handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={info.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={info.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={info.password}
              onChange={handleChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={info.location}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/login">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
