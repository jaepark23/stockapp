import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../context/AuthContext";

function SideBar() {
  let { loginUser } = useContext(AuthContext);
  let { user, logoutUser } = useContext(AuthContext);
  const [showEntry, setEntry] = useState(false);

  return (
    <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
      <h3> Stock Simulator </h3>
      <li className="nav-item">
        <a href="#" className="nav-link">
          <span>Home</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="#submenu1" className="nav-link">
          <span>Order History</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link">
          <span>NAV 1</span>
        </a>
      </li>
      <li className="nav-item">
        <Link to="/register"> Register </Link>
      </li>
      {user && <button onClick={logoutUser}> Logout </button>}
      {!user && (
        <form onSubmit={loginUser}>
          <input type="text" name="username" placeholder="enter username" />
          <input type="password" name="password" placeholder="enter password" />
          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default SideBar;

{
  /* <div>
<form onSubmit = {loginUser}>
    <input type = "text" name = "username" placeholder = "enter username" />
    <input type = "password" name = "password" placeholder = "enter password" />
    <input type = "submit"/>
</form>
</div> */
}

{
  /* <div class = "col-3">
<div class = "wrapper">
  <nav class = "sidebar">
    <h1> Hello</h1>
    <div class = "list-group">
    <a href="#" class="list-group-item" aria-current="true"> Test </a>
    </div>
  </nav>
</div>
</div> */
}
