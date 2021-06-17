import React from "react";
import { Link } from "react-router-dom";
import { routes } from "App";

const HomePage = () => {
  return (
    <div>
      {routes.map((r) => (
        <Link to={r.path} key={r.path}>
          {r.path}
          <br />
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
