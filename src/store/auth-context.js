import React, { useContext, useState, useEffect } from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState();
  function signup(userData, userType){
    setUserType(userType)
    const status = createUserWithEmailAndPassword(auth, userData.email, userData.password);
    return status;
  }

  function login(email, password, userType) {
    setUserType(userType)
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  // getUser
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [userType])
  const contextValue = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
