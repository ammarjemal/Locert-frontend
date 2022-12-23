import React, { useContext, useState } from "react";

const AdminContext = React.createContext();

export function useAdminAuth() {
    return useContext(AdminContext);
}

export function AdminContextProvider(props) {
    const [adminUser, setAdminUser] = useState(null);
    
    function adminLogin(uid) {
        setAdminUser(uid);
    }

    function adminLogout() {
        setAdminUser(null);
    }

    const contextValue = {
        adminUser,
        isAdminLoggedIn: !!adminUser,
        adminLogin,
        adminLogout
    }
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
