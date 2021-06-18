import { createContext, useContext } from "react";
import Link from "components/link"
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


      <Link to="/"   >myLink</Link>
    </ThemeContext.Provider>
  );
};

export default Context;
