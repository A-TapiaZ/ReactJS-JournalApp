
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import JournalScreen from '../components/Journal/JournalScreen'

const AppRouter = () => {
  return (
    <Router>
      {/* Este div se implementa por recomendacion de los creadores */}
      <div> 
        <Switch>
          <Route
            path="/auth"
            component={AuthRouter}  
          />

          <Route
            exact
            path="/"
            component={JournalScreen}
          />

          <Redirect to="/auth/login"/>

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
