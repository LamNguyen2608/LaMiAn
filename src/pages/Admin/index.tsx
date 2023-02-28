import React, { useEffect } from 'react';
import AdminPageContent from '@/components/Layout/AdminPageContent';
import AdminTopic from '@/components/Admin/AdminTopic';
import AdminAccessChart from '@/components/Admin/AdminAccessChart';
import AdminDepartmentChart from '@/components/Admin/AdminDepartmentChart';
import AdminCategoryChart from '@/components/Admin/AdminCategoryChart';
import AdminButtonFunc from '@/components/Admin/AdminButtonFunc';


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