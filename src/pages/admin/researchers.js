import React, { useEffect, useState, useCallback } from 'react'
import Tabs from '../../components/UI/Tabs';
import Researchers from '../../components/Admin/Researchers/Researchers';
import { getResearchers } from '../../api/adminApi';
const AdminResearchersPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bannedResearchers, setBannedResearchers] = useState([]);
    const [basicResearchers, setBasicResearchers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [allResearchers, setAllResearchers] = useState([]);
    const populateResearchers = (fetchedResearchers) => {
        setBasicResearchers([]);
        setBannedResearchers([]);
        setAdmins([]);
        fetchedResearchers.forEach(researcher => {
            console.log(researcher)
            // Researchers which are not admins and are not banned (BASIC)
            if(!researcher.isAdmin && !researcher.isBanned){
                setBasicResearchers(oldResearchers => [...oldResearchers, researcher])
            }else if(researcher.isBanned){
                setBannedResearchers(oldResearchers => [...oldResearchers, researcher])
            }else if(researcher.isAdmin && !researcher.isBanned){
                setAdmins(oldResearchers => [...oldResearchers, researcher])
            }
        });
    }
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        let fetchedResearchers = [];
        fetchedResearchers = await getResearchers({ setIsLoading, setError });
        if(fetchedResearchers.length){
            setAllResearchers(fetchedResearchers);
        }
        populateResearchers(fetchedResearchers);
    }, []);
    useEffect(() => {
        fetchData();
    },[fetchData]);
    const tabs = [
        {
            key: 1,
            href: "tabs-allFill",
            id: "tabs-all-tabFill",
            label: `All (${allResearchers.length})`,
            active: true,
            content: <Researchers isLoading={isLoading} error={error} researchers={allResearchers} setAllResearchers={setAllResearchers} setBasicResearchers={setBasicResearchers} setBannedResearchers={setBannedResearchers} setAdmins={setAdmins} basicResearchers={basicResearchers} bannedResearchers={bannedResearchers} admins={admins} allResearchers={allResearchers}/>
        },
        {
            key: 2,
            href: "tabs-basicFill",
            id: "tabs-basic-tabFill",
            label: `Researchers (${basicResearchers.length})`,
            active: false,
            content: <Researchers isLoading={isLoading} error={error} researchers={basicResearchers} setAllResearchers={setAllResearchers} setBasicResearchers={setBasicResearchers} setBannedResearchers={setBannedResearchers} setAdmins={setAdmins} basicResearchers={basicResearchers} bannedResearchers={bannedResearchers} admins={admins} allResearchers={allResearchers}/>
        },
        {
            key: 3,
            href: "tabs-adminsFill",
            id: "tabs-admins-tabFill",
            label: `Admins (${admins.length})`,
            active: false,
            content: <Researchers isLoading={isLoading} error={error} researchers={admins} setAllResearchers={setAllResearchers} setBasicResearchers={setBasicResearchers} setBannedResearchers={setBannedResearchers} setAdmins={setAdmins} basicResearchers={basicResearchers} bannedResearchers={bannedResearchers} admins={admins} allResearchers={allResearchers}/>
        },
        {
            key: 4,
            href: "tabs-bannedFill",
            id: "tabs-banned-tabFill",
            label: `Banned (${bannedResearchers.length})`,
            active: false,
            content: <Researchers isLoading={isLoading} error={error} researchers={bannedResearchers} setAllResearchers={setAllResearchers} setBasicResearchers={setBasicResearchers} setBannedResearchers={setBannedResearchers} setAdmins={setAdmins} basicResearchers={basicResearchers} bannedResearchers={bannedResearchers} admins={admins} allResearchers={allResearchers}/>
        }
    ]
    return (
        <div className='w-full flex justify-center'>
            <Tabs
                tabs={tabs}
            />
        </div>
    )
}

export default AdminResearchersPage