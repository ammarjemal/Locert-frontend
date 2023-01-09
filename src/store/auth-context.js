import React, { useContext, useState, useEffect } from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { checkIsBanned } from "../api/userApi";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo-loading.svg";
import { useUserProfile } from "./user-profile-context";
import { Confirm } from "../components/UI/Confirm";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { updateUserProfile } = useUserProfile();    
  const [isConfirmShown, setIsConfirmShown] = useState(false);

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
  const okClickHandler = () => {
    history.push('/login');
    setIsConfirmShown(false);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if(user === null){
        setIsLoading(false);
        return;
      }
      const isBanned = await checkIsBanned(user.email);
      if(isBanned){
        logout();
        setIsConfirmShown(true);
        return;
      }
      console.log(user);
      updateUserProfile({photoURL: user.photoURL, displayName: user.displayName});
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [history, currentUser, updateUserProfile]);
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
      {isConfirmShown && <Confirm confirmButtonText="Ok" confirmTitle="Account Banned" onClick={okClickHandler} cancelButtonHidden={true}>Your account has been banned</Confirm>}
      {!isLoading && props.children}
      {isLoading &&
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <img src={logo} alt='Logo' className="opacity-1/2 w-36 h-36 animate-pulse"/>
      </div>}
    </AuthContext.Provider>
  );
};

export default AuthContext;
