import React,{useState} from 'react'
import { Link,useNavigate } from "react-router-dom";




function Login() {

  const [info, setinfo] = useState({

    email: "",
    password: "",

  });
  let Navigate = useNavigate();
  const Handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        email: info.email,
        password: info.password,
   
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success) {
      localStorage.setItem("userEmail",info.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      Navigate("/");
    }
  };
  const handleChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={Handlesubmit}>
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
          
          <button type="submit" className="btn btn-primary btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/createuser">
            I am new a user
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login;