import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  const[cartview,setcartview] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
   const handleLogout= () => {
      localStorage.removeItem("authToken");
      navigate("/login");
   }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            FOODYS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/" 
                  >
                    My orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                {" "}
                <Link className="btn  bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn  bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>{" "}
              </div>
            ) : (
              <div>
                <div className="btn  bg-white text-success mx-2 " onClick={()=> {setcartview(true)}} > My Cart{"      "}
                
                {data.length===0?null:<Badge pill bg="danger">{data.length}</Badge>}
             
                </div>
                {cartview?<Modal onClose={()=> setcartview(false)}><Cart/></Modal>:null}
                <div className="btn  bg-white text-danger mx-1" onClick={handleLogout}>Log Out</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
