import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function RegisterPage() {
  let { registerUser } = useContext(AuthContext);

  return (
    <div className="container-fluid container-nav">
      <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="enter username" />
        <input type="password" name="password" placeholder="enter password" />
        <input
          type="password"
          name="password2"
          placeholder="enter password again"
        />
        <input
          type="number"
          name="balance"
          placeholder="enter starting balance"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default RegisterPage;
