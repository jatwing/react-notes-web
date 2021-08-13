
import { counterSlice  } from './counter-slice'

const ReduxAppStructure = () => {

  const newState = counterSlice.reducer(
    { value: 10},
    counterSlice.actions.increment()
  )

  console.log(newState)

  return (
    <>




    </>

  )

}

export default ReduxAppStructure
