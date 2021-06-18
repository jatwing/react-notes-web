import { createContext, useContext } from "react";
import Link from "components/link"

import { test as Test} from "components/link"
import { Link as RLink} from "react-router-dom"
const ThemeContext = createContext("light");




const ThemeButton = () => {
  const context = useContext(ThemeContext);
  return <div>{context}</div>;
};

const Toolbar = () => {
  return (
    <div>
      <ThemeButton />
    </div>
  );
};

const Context = () => {


  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />

      <Test to="/02-main-concepts" color="secondary">
        test the link combined
      </Test>

    <br/>
      <RLink to="/" replace={undefined} innerRef={undefined} component={undefined}>dadsdas</RLink>

    </ThemeContext.Provider>
  );
};

export default Context;
