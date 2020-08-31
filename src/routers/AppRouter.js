
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import JournalScreen from '../components/Journal/JournalScreen'
import {firebase} from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { startLoadingNotes } from '../actions/notes'

const AppRouter = () => {

  const dispatch = useDispatch()
  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // SI, user uid existe, cumple la condicion y entra.
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
        
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false);
    })
    // Ponemos la dependencia para evitar una advertencia. 
  }, [dispatch,setCheking,setIsLoggedIn])

  if (cheking) {
    return (// Aca podems porner cualquier cpomponenete para una pantalla de espera, lo hice sencillo porque el instructor lo hizo sencillo
    <h1>Cargando ...</h1>)
  } 


  return (
    <Router>
      {/* Este div se implementa por recomendacion de los creadores */}
      <div> 
        <Switch>
          <PublicRoute
          // Aca no puede ser 'exact' porque contiene dos rutas más dentro.
            path="/auth"
            component={AuthRouter}  
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isAuthenticated={isLoggedIn}
          />

          <Redirect to="/auth/login"/>

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
