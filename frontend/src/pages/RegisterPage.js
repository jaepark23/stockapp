import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
function RegisterPage() {
  let { registerUser } = useContext(AuthContext);

  return (
    <div class="container-fluid" style={{ backgroundColor: '#6CB4EE' }}>
      <div class="row" id="loginpage">
        <div class="col-md-4 mx-auto">
          <div class="card ">
            <h3 class="card-title mx-auto mt-3">Stock Simulator</h3>

            <div class="card-body">
              <form onSubmit={registerUser}>
                <div class="input-group mb-3">
                  <input type="text" name="username" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                  <input type="password" name="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                  <input type="password" name="password2" class="form-control" placeholder="Password Again" aria-label="Password Again" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                  <input type="number" name="balance" class="form-control" placeholder="Starting Balance" aria-label="Starting Balance" aria-describedby="basic-addon1" />
                </div>
                <div class="text-center">
                  <button class="btn btn-primary mb-2 text-center" type="submit">Register</button>
                </div>
                <div class="text-center">
                  <Link to="/login" className='roboto'>Have an account?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
