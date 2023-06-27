'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    icon: ReactNode;
    title: string;
    path: string;
}

export const SidebarItem = ( { icon, title, path }: Props ) => {
    const currentPath = usePathname();

    return (
        <li>
            <Link href={ path }
                  className={ `relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white 
                  ${ currentPath === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : '' }` }>
                { icon }
                <span className="group-hover:text-white-700">{ title }</span>
            </Link>
        </li>
    );
};
