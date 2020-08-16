import React, { useEffect } from "react";
export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`
  // fetch("http://localhost:31415/api/me/profile")
  //   .then((data) => data.json())
  //   .then((data) => {
  //     setCurrentUser(data.profile);
  //     setStatus("idle");
  //   })
  //   .catch((err) => {
  //     console.log("Something went wrong!");
  //   });

  const fetchUser = async () => {
    const call = await fetch("http://localhost:31415/api/me/profile");
    const data = await call.json();

    setCurrentUser(data.profile);
    setStatus("idle");
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
