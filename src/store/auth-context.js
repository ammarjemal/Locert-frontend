// import React, { useState, useEffect, useCallback } from 'react';

// let logoutTimer;

// const AuthContext = React.createContext({
//   id: '',
//   firstName: '',
//   lastName: '',
//   profilePicture: '',
//   token: '',
//   isLoggedIn: false,
//   autoLogin: (token) => {},
//   login: (token) => {},
//   logout: () => {},
// });

// const calculateRemainingTime = (expirationTime) => {
  
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem('token');
//   const storedExpirationDate = localStorage.getItem('expirationTime');

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 3600) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');
//     return null;
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

// export const AuthContextProvider = (props) => {
//   const tokenData = retrieveStoredToken();
  
//   let initialToken;
//   if (tokenData) {
//     initialToken = tokenData.token;
//   }

//   const [token, setToken] = useState(initialToken);
//   const [userData, setUserData] = useState({
//     id: '',
//     firstName: '',
//     lastName: '',
//   });
//   // console.log(userData);
//   const userIsLoggedIn = !!token;

//   const logoutHandler = useCallback(() => {
//     setToken(null);
//     setUserData({
//       id: '',
//       firstName: '',
//       lastName: '',
//     })
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');

//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);

//   const loginHandler = (token, expirationTime, userData) => {
//     setToken(token);
//     setUserData({
//       id: userData.id,
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//     })
//     localStorage.setItem('token', token);
//     localStorage.setItem('expirationTime', expirationTime);

//     const remainingTime = calculateRemainingTime(expirationTime);

//     logoutTimer = setTimeout(logoutHandler, remainingTime);
//   };

//   useEffect(() => {
//     if (tokenData) {
//       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
//     }
//   }, [tokenData, logoutHandler]);

  // const contextValue = {
  //   id: userData.id,
  //   firstName: userData.firstName,
  //   lastName: userData.lastName,
  //   // profilePicture: userData.profilePicture,
  //   token: token,
  //   isLoggedIn: userIsLoggedIn,
  //   login: loginHandler,
  //   // autoLogin: autoLoginHandler,
  //   logout: logoutHandler,
  // };
  import React, { useContext, useState, useEffect } from "react";
  import auth from "../firebase";
  // import createUserWithEmailAndPassword    from "../firebase";
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
  // const auth = getAuth();

  const AuthContext = React.createContext();
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  export function AuthContextProvider(props) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState();
    // console.log();
    function signup(userData, userType) {
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
