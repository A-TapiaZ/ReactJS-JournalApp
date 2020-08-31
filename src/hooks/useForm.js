import { useState } from "react"

export const useForm = (initialState = {}) => {
  
  const [values, setValues] = useState(initialState)  

  // Este useForm tiene una pequeña modificacion por como va a ser implementado el reset en esta aplicacion. El reset lo que me va a permitir es que cuando yo lo llame, pueda establecer los valores que yo quiera al formulario.  
  const reset = (newFormState= initialState) => {
    setValues(newFormState)
  }
  

  const handleInputChange= ({target}) => {
    // console.log(target);
    setValues({
      ...values,
      [target.name]:target.value
    })
  }

  return [values, handleInputChange, reset]
  
}
