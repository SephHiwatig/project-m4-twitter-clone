import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const history = createBrowserHistory();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  const fetchUser = async () => {
    try {
      const call = await fetch("http://localhost:31415/api/me/profile");
      const data = await call.json();

      setCurrentUser(data.profile);
      setStatus("idle");
    } catch {
      history.push("/error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
