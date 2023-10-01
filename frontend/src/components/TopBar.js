import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../context/AuthContext";

function TopBar() {
    let { loginUser } = useContext(AuthContext);
    let { user, logoutUser } = useContext(AuthContext);
    const [showEntry, setEntry] = useState(false);

    return (
        <nav class="navbar">

            <ul class="nav">
                <li class="nav-item">
                    <a id="logo" href="">Stock Simulator</a>
                </li>
                <li class="nav-item">
                    <Link to="/" className='roboto'> Home </Link>
                </li>
                <li class="nav-item">
                    <Link to="/research" className='roboto'> Research </Link>
                </li>
                <li class="nav-item">
                    <Link to="/history" className='roboto'> Order History </Link>
                </li>
                <li class="nav-item">

                    {user && <a id="myLink" title="Logout"
                        href="" onClick={logoutUser}>Logout</a>}
                </li>
            </ul>
        </nav>
    )
}

export default TopBar;