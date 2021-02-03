import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "./actions/authActions";


const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* <Link to="/">Home</Link>  */}
      {/* <Link to="/">Login</Link>  */}
      {/* <Link to="/register">Register</Link>  */}
      <Link to="/" onClick={() => dispatch(logOut())} className="logout">
        Logout
      </Link>
    </div>
  );
};

export default Navbar;
