import { createContext, useContext } from "react";

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
    </ThemeContext.Provider>
  );
};

export default Context;
