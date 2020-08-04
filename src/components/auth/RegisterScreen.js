import React from 'react'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
  return (
    
    <div>

      <h3 className="auth__title">Register</h3>

      <form>
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
        />

        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm"
          name="password2"
        />

        <button
          className="btn btn-primary btn-block mb-5"
          // disabled={true}
          type="submit"
        
        >Register
        </button>


        <Link
          className="link" 
          to="/auth/login">
          Already register?
        </Link>



      </form>

    </div>
  )
}

export default RegisterScreen
