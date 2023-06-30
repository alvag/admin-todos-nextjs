'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';

interface ProfileProps {
}

const ProfilePage: FC<ProfileProps> = ( {} ) => {

    const { data: session } = useSession();

    return (
        <div className="flex flex-col">
            <h1>Profile Page</h1>

            <span>{ session?.user?.name }</span>
            <span>{ session?.user?.email }</span>
            <span>{ session?.user?.image }</span>
        </div>
    );
};

export default ProfilePage;
