import React from 'react'
import { useState, useEffect, useCallback } from "react"
import ResearcherItem from "./ResearcherItem";
import Spinner from "../../UI/Spinner";
import { getResearchers } from '../../../api/adminApi';
// import Toast from '../../UI/Toast';
const Researchers = (props) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        let fetchedUsers = [];
        fetchedUsers = await getResearchers(props.fetchType, { setIsLoading, setError });
        console.log(props.fetchType);
        console.log(fetchedUsers);
        if(fetchedUsers.length){
            setUsers(fetchedUsers);
        }
    }, [props.fetchType]);
    useEffect(() => {
        fetchData();
    },[fetchData]);
  return (
    <div className="flex flex-col items-center">
        <div className={`w-full sm:w-3/4 md:w-1/2 users-wrapper ml-0 mt-9 ${props.className}`}>
            {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
            {(!error && !users.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No user found</p>}
            {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
            {!isLoading && 
                users.map(user => (
                    user.displayName &&
                    <ResearcherItem
                        key={user.id}
                        id={user.id}
                        uid={user.uid}
                        displayName={user.displayName}
                        photoURL={user.photoURL}
                        isAdmin={user.isAdmin}
                        isBanned={user.isBanned}
                        setError={setError}
                    />
                ))
            }
        </div>
        {/* {error && <Toast show={true} setState={setError} message={error}/>} */}
    </div>
  )
}

export default Researchers