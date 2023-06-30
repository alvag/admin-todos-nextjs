import { FC } from 'react';
import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface DashboardProps {
}

const DashboardPage: FC<DashboardProps> = async ( {} ) => {
    const session = await getServerSession( authOptions );

    if ( !session ) {
        redirect( '/api/auth/signin' );
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <WidgetItem title="Usuario conectado Server Side">
                <div className="flex flex-col">
                    <span>{ session.user?.name }</span>
                    <span>{ session.user?.email }</span>
                    <span>{ session.user?.image }</span>
                </div>
            </WidgetItem>
        </div>
    );
};

export default DashboardPage;
