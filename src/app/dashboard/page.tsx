import { FC } from 'react';
import { WidgetItem } from '@/components';

interface DashboardProps {
}

const DashboardPage: FC<DashboardProps> = ( {} ) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WidgetItem/>
        </div>
    );
};

export default DashboardPage;
