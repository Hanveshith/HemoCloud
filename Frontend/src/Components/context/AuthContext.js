import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState();

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:3177/auth/loggedIn", { withCredentials: true });
    setLoggedIn(loggedInRes.data.auth);
    setUser(loggedInRes.data.user);
    setRole(loggedInRes.data.role);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn,role}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
