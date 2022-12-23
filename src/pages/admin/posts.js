import React from 'react'
import { Tabs } from 'antd';
import Posts from '../../components/Admin/Posts/Posts';
import { useState } from 'react';
const AdminArticlesPage = () => {
    const [allCount, setAllCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);
    const labels = [
        {
            label: `All (${allCount})`,
            key: 1,
            children: <Posts setArticlesCount={setAllCount} fetchType="ALL"/>,
        },{
            label: `Pending (${pendingCount})`,
            key: 2,
            children: <Posts setArticlesCount={setPendingCount} fetchType="PENDING"/>, 
        },{
            label: `Approved (${approvedCount})`,
            key: 3,
            children: <Posts setArticlesCount={setApprovedCount} fetchType="APPROVED"/>, 
        },{
            label: `Declined (${declinedCount})`,
            key: 4,
            children: <Posts setArticlesCount={setDeclinedCount} fetchType="DECLINED"/>, 
        }
    ]
    return (
        <div className='w-full flex justify-center'>
            <Tabs
                className='w-full text-inherit px-2'
                defaultActiveKey={1}
                centered
                items={labels}
            />
        </div>
    )
}

export default AdminArticlesPage;