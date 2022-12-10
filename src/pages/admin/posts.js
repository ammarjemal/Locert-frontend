import React from 'react'
import { Tabs } from 'antd';
import Posts from '../../components/Admin/Posts/Posts';

const AdminArticlesPage = () => {
    const labels = [
        {
            label: `All`,
            key: 1,
            children: <Posts fetchType="ALL"/>,
        },{
            label: `Pending`,
            key: 2,
            children: <Posts fetchType="PENDING"/>, 
        },{
            label: `Approved`,
            key: 3,
            children: <Posts fetchType="APPROVED"/>, 
        },{
            label: `Declined`,
            key: 4,
            children: <Posts fetchType="DECLINED"/>, 
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