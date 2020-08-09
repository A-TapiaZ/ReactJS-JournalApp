import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
import uiReducer from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Tambien se puede encontrar en la documentacion como root reducers 
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer
})


// Un incoveniente que tiene el crate store es que solo recibe un reducer, para poder implementar mas reducers a la vez, es necesario implementar un combiner que lo que hace como su nombre lo dice es combinar los reducers en  
export const store= createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

