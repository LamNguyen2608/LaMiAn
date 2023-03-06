import React, { useEffect } from 'react';
import AdminPageContent from '@/components/Layout/AdminPageContent';
import AdminTopic from '@/components/AdminIndex/AdminTopic';
import AdminAccessChart from '@/components/AdminIndex/AdminAccessChart';
import AdminDepartmentChart from '@/components/AdminIndex/AdminDepartmentChart';
import AdminCategoryChart from '@/components/AdminIndex/AdminCategoryChart';
import AdminButtonFunc from '@/components/AdminIndex/AdminButtonFunc';


const TopicPage: React.FC = ({ }) => {
  
    return (
        <>
            
            <AdminPageContent>
                <>
                <AdminTopic />
                </>
                <>
                <AdminAccessChart />
                </>
                <>
                <AdminDepartmentChart />
                </>
                <>
                <AdminCategoryChart />
                </>
                <>
                <AdminButtonFunc />
                </>
            </AdminPageContent>
        </>
    )
}

export default TopicPage;