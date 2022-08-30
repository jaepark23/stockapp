import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../context/AuthContext";

function SideBar() {
  let { loginUser } = useContext(AuthContext);
  let { user, logoutUser } = useContext(AuthContext);
  const [showEntry, setEntry] = useState(false);

  return (
    <div className="nav flex-column flex-nowrap vh-100 overflow-auto p-2 sidebar-nav">
      <h3 className = 'roboto' style={{fontWeight: 'bold'}}> Stock Simulator </h3>
      <li className="nav-item">
        <Link to="/" className = 'roboto'> Home </Link>
      </li>
      <li className="nav-item">
        <Link to="/research" className = 'roboto'> Research </Link>
      </li>
      <li className="nav-item">
        <Link to="/history" className = 'roboto'> Order History </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className = 'roboto'> Register </Link>
      </li>

      {user && <button onClick={logoutUser} className = 'roboto'> Logout </button>}
      {!user && (
        <form onSubmit={loginUser}>
          <input type="text" name="username" placeholder="enter username" className = 'roboto'/>
          <input type="password" name="password" placeholder="enter password" className = 'roboto'/>
          <input type="submit" value = "Login"/>
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
