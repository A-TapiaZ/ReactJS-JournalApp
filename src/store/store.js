import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
import uiReducer from "../reducers/uiReducer";
import notesReducer from "../reducers/notesReducer";

// Esta linea se tomó del git de la extension de redux. Lo que hace es que me permite usar la extension para el navegador y ademas los middelwares (Thunk), de otra forma solo podria usar solo uno de los dos.
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Tambien se puede encontrar en la documentacion como root reducers.
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
})


// Un incoveniente que tiene el crate store es que solo recibe un reducer, para poder implementar mas reducers a la vez, es necesario implementar un combiner que lo que hace como su nombre lo dice es combinar los reducers en  
export const store= createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

