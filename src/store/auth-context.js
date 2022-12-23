import React, { useContext, useState, useEffect } from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { checkIsBanned } from "../api/userApi";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  function signup(userData){
    const status = createUserWithEmailAndPassword(auth, userData.email, userData.password);
    return status;
  }

  async function login(email, password, setError) {
    const isBanned = await checkIsBanned(email);
    if(isBanned){
      setError("Your account has been banned");
      return false;
    }
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
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if(user === null){
        setIsLoading(false);
        return;
      }
      const isBanned = await checkIsBanned(user.email);
      if(isBanned){
        //Log user out
        alert("Your account has been banned");
        logout();
        history.push('/login');
      }
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [history])
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
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
