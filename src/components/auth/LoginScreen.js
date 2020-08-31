import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';

function LoginScreen() {

  // Este hook, nos lo brinda react redux, por lo que hay que importarlo, pero es una herrramienta sumamente util, porque no importa en que parte de la aplicacion se encuentre, este hook nos dara la capacidad de realizar dispatch de acciones. 
  const dispatch = useDispatch()

  // Tomamos el valor de un estado de redux
  const {msgError,loading} = useSelector(state => state.ui)


  const [formValues,handleInputChange]= useForm({
    email:'nando@gmail.com',
    password:'123456'
  });

  const {email,password}= formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
      dispatch(startLoginEmailPassword(email,password));
    }
  }
  
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }
  
  const isFormValid = () => {

    if (!validator.isEmail(email)){
      // console.log('Email not value');
      dispatch(setError('This is not a email'))
      return false;
    } else if (password.length<1) {
      dispatch(setError('Please enter a password'))
      return false;
    } 

    dispatch(removeError())
    return true;
  }

  return (
    <div>

      <h3 className="auth__title">Log in</h3>


      <form 
        onSubmit={handleLogin}
        className= "animate__animated animate__fadeIn animate__faster"
        >

      {
          msgError && 
          (
            <div className="auth__alert-error">
            {msgError}
            </div>
          )
        }

        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <input
        className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary btn-block"
          disabled={loading}
          type="submit"
        >Login
        </button>

        
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div 
            className="google-btn"
            onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>

        </div>

        <Link
          className="link" 
          to="/auth/register">
          Create new Account
        </Link>



      </form>

    </div>
  )
}

export default LoginScreen
