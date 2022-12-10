import React from 'react'
import { Tabs } from 'antd';
import Researchers from '../../components/Admin/Researchers/Researchers';
const AdminResearchersPage = () => {
    const labels = [
        {
            label: `All`,
            key: 1,
            children: <Researchers fetchType="ALL"/>,
        },{
            label: `Researchers`,
            key: 2,
            children: <Researchers fetchType="BASIC"/>, 
        },{
            label: `Admins`,
            key: 3,
            children: <Researchers fetchType="ADMIN"/>, 
        },{
            label: `Banned`,
            key: 4,
            children: <Researchers fetchType="BANNED"/>, 
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

export default AdminResearchersPage