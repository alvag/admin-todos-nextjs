'use client';

import { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    icon: ReactElement;
    title: string;
    path: string;
}

export const SidebarItem = ( { icon, title, path }: Props ) => {
    const currentPath = usePathname();

    return (
        <li>
            <Link href={ path }
                  className={ `relative px-4 py-3 flex items-center space-x-4 rounded-xl ${ currentPath === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : '' }` }>
                { icon }
                <span className="-mr-1 font-medium">{ title }</span>
            </Link>
        </li>
    );
};
