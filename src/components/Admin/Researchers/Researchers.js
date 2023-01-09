import React from 'react'
import { useState, useEffect, useCallback } from "react"
import ResearcherItem from "./ResearcherItem";
import Spinner from "../../UI/Spinner";
// import Toast from '../../UI/Toast';
const Researchers = (props) => {
    const { researchers, isLoading, error, setAllResearchers, setBasicResearchers, setBannedResearchers, setAdmins, basicResearchers, bannedResearchers, admins, allResearchers } = props;
    const [disableAll, setDisableAll] = useState(false);
    console.log(researchers);
    return (
        <div className="flex flex-col items-center">
            <div className={`w-full relative sm:w-3/4 researchers-wrapper ml-0 mt-9 ${props.className}`}>
                {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
                {(!error && !researchers.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No user found</p>}
                {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
                {!isLoading && 
                    researchers.map(user => (
                        // user.displayName &&
                        <ResearcherItem
                            key={user.id}
                            id={user.id}
                            uid={user.uid}
                            displayName={user.displayName}
                            joinedAt={user.joinedAt}
                            photoURL={user.photoURL}
                            isAdmin={user.isAdmin}
                            isBanned={user.isBanned}
                            
                            setBasicResearchers={setBasicResearchers}
                            setBannedResearchers={setBannedResearchers}
                            setAdmins={setAdmins}
                            setAllResearchers={setAllResearchers}
                            basicResearchers={basicResearchers}
                            bannedResearchers={bannedResearchers}
                            admins={admins}
                            allResearchers={allResearchers}
                            disableAll={disableAll}
                            setDisableAll={setDisableAll}
                        />
                    ))
                }
            </div>
            {/* {error && <Toast show={true} setState={setError} message={error}/>} */}
        </div>
    )
}

export default Researchers