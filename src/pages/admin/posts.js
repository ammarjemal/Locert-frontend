import React, { useEffect, useState, useCallback } from 'react'
import Tabs from '../../components/UI/Tabs';
import Posts from '../../components/Admin/Posts/Posts';
import { getArticles } from '../../api/adminApi';
const AdminArticlesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingArticles, setPendingArticles] = useState([]);
    const [approvedArticles, setApprovedArticles] = useState([]);
    const [declinedArticles, setDeclinedArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const populateArticles = (fetchedArticles) => {
        setApprovedArticles([]);
        setPendingArticles([]);
        setDeclinedArticles([]);
        fetchedArticles.forEach(article => {
            if(article.status === "APPROVED"){
                setApprovedArticles(oldArticles => [...oldArticles, article])
            }else if(article.status === "PENDING"){
                setPendingArticles(oldArticles => [...oldArticles, article])
            }else if(article.status === "DECLINED"){
                setDeclinedArticles(oldArticles => [...oldArticles, article])
            }
        });
    }
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        let fetchedArticles = [];
        fetchedArticles = await getArticles({ setIsLoading, setError });
        if(fetchedArticles.length){
            setAllArticles(fetchedArticles);
        }
        populateArticles(fetchedArticles);
    }, []);
    useEffect(() => {
        fetchData();
    },[fetchData]);
    const tabs = [
        {
            key: 1,
            href: "tabs-allFill",
            id: "tabs-all-tabFill",
            label: `All (${allArticles.length})`,
            active: true,
            content: <Posts isLoading={isLoading} error={error} x="all" articles={allArticles} setAllArticles={setAllArticles} setApprovedArticles={setApprovedArticles} setPendingArticles={setPendingArticles} setDeclinedArticles={setDeclinedArticles} pendingArticles={pendingArticles} approvedArticles={approvedArticles} declinedArticles={declinedArticles} allArticles={allArticles}/>
        },
        {
            key: 2,
            href: "tabs-pendingFill",
            id: "tabs-pending-tabFill",
            label: `Pending (${pendingArticles.length})`,
            active: false,
            content: <Posts isLoading={isLoading} error={error} articles={pendingArticles} setAllArticles={setAllArticles} setApprovedArticles={setApprovedArticles} setPendingArticles={setPendingArticles} setDeclinedArticles={setDeclinedArticles} pendingArticles={pendingArticles} approvedArticles={approvedArticles} declinedArticles={declinedArticles} allArticles={allArticles}/>
        },
        {
            key: 3,
            href: "tabs-approvedFill",
            id: "tabs-approved-tabFill",
            label: `Approved (${approvedArticles.length})`,
            active: false,
            content: <Posts isLoading={isLoading} error={error} articles={approvedArticles} setAllArticles={setAllArticles} setApprovedArticles={setApprovedArticles} setPendingArticles={setPendingArticles} setDeclinedArticles={setDeclinedArticles} pendingArticles={pendingArticles} approvedArticles={approvedArticles} declinedArticles={declinedArticles} allArticles={allArticles}/>
        },
        {
            key: 4,
            href: "tabs-declinedFill",
            id: "tabs-declined-tabFill",
            label: `Declined (${declinedArticles.length})`,
            active: false,
            content: <Posts isLoading={isLoading} error={error} articles={declinedArticles} setAllArticles={setAllArticles} setApprovedArticles={setApprovedArticles} setPendingArticles={setPendingArticles} setDeclinedArticles={setDeclinedArticles} pendingArticles={pendingArticles} approvedArticles={approvedArticles} declinedArticles={declinedArticles} allArticles={allArticles}/>
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

export default AdminArticlesPage;