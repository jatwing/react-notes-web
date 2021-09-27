import { useCallback, useState } from 'react';





export const useToggle = (initialValue  = false) => {
  const [value, setValue] = useState(initialValue);
  const setOn = useCallback(() => setValue(true)   , [])
  const setOff = useCallback( () => setValue(false)  , [])
  const toggle = useCallback( () => setValue( (value) => !value) , [])

  return { value, setOn, setOff, toggle }

}


