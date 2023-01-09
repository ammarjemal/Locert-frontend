import React, { useContext, useState, useCallback } from "react";

const UserContext = React.createContext();

export function useUserProfile() {
    return useContext(UserContext);
}

export function UserProfileContextProvider(props) {
    // const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    
    const updateUserProfile = useCallback((userProfile) => {
        setUserProfile(userProfile);
    },[])
    const contextValue = {
        userProfile,
        updateUserProfile
    }
    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
