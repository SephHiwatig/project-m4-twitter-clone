import React from "react";
export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`
  fetch("http://localhost:31415/api/me/profile")
    .then((data) => data.json())
    .then((data) => {
      console.log(data.profile);
    })
    .catch((err) => {
      alert("Something went wrong!");
    });

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
