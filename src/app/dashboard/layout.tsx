import { ReactNode } from 'react';
import { Sidebar, TopMenu } from '@/components';

interface LayoutProps {
    children: ReactNode;
}

export default function DashboardLayout( { children }: LayoutProps ) {
    return (
        <>
            <Sidebar/>
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
                <TopMenu/>
                <div className="px-6 pt-6">
                    { children }
                </div>
            </div>
        </>
    );
}
