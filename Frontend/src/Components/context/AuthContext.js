import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState();
  const [donor, setDonor] = useState(false);
  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:3177/auth/loggedIn", { withCredentials: true });
    console.log(loggedInRes.data.role);
    const userRes = loggedInRes.data.role !== "bank" ? await axios.get(`http://localhost:3177/u/donor/donor-status/${loggedInRes.data.user.id}`, { withCredentials: true }) : "null";
    setDonor(userRes.data);  
    console.log(loggedInRes.data);
    setLoggedIn(loggedInRes.data.auth);
    setUser(loggedInRes.data.user);
    setRole(loggedInRes.data.role);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn,role,donor}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
