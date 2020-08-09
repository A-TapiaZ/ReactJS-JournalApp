import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const {msgError} = useSelector(state => state.ui)

  const [formValues,handleInputChange]= useForm({
    name:'Hernando',
    email:'nando@gmail.com',
    password:'123456',
    password2:'123456'
  });

  const {name, email, password, password2} = formValues;
  
  const handleRegister= (e) => {
    e.preventDefault();
    if ( isFormValid() ) {
      
      dispatch(startRegisterWithEmailPasswordName(email,password,name))

    }
  }
  
  const isFormValid = () => {
    if (name.trim().length === 0) {
      // console.log('Name is required');
      dispatch(setError('Name is required'))
      return false;
    } else if (!validator.isEmail(email)){
      // console.log('Email not value');
      dispatch(setError('Email not value'))
      return false;
    } else if (password !== password2 || password.length<5){
      // console.log('Password is not enough');
      dispatch(setError('Password is not enough'))
      return false;
    }

    dispatch(removeError())
    return true;
  }
  
  

  return (
    
    <div>
      <h3 className="auth__title">Register</h3>
      
      <form>

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
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

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

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary btn-block mb-5"
          // disabled={true}
          type="submit"
          onClick={handleRegister}
        
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
