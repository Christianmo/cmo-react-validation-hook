import { useState } from "react";

import { getErrorMessage } from "./utils";

const useValidation = (initialState={}) => {

  const [fieldsState, setFields] = useState(initialState);
    
  const handleChange = (evt:any) => {
    const fields: any = JSON.parse(JSON.stringify(initialState));
    const { name, value } = evt.target;
    const { rules } = fields[name];

    fields[name] = {
      ...fields[name],
      errorMessage: getErrorMessage({ name, value, rules })
    }

    setFields(fields);
  }

  return { fields: fieldsState, handleChange }
}

export default useValidation;
