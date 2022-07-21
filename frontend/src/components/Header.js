import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Header() {
    let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
        {user ? (<p onClick = {logoutUser}> Logout </p>) : (<Link to ="/login"> </Link>)}
        {user && <p> Hello {user.username} </p>}

    </div>
  )
}

export default Header