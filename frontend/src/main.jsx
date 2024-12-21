import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Initially user is not authorized
export const Context = createContext();

const AppWrapper = () => {
  // Initially user is not authorized; we will store user authorization status
  const [isAuthorized, setIsAuthorized] = useState(false);
  // Storing user information
  const [user, setUser] = useState(null);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
