'use client';

import { useState } from 'react';

const tabOptions = [ 1, 2, 3, 4, 5 ];

interface Props {
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ( { currentTab = 1, tabOptions = [ 1, 2, 3, 4 ] }: Props ) => {
    const [ selected, setSelected ] = useState( currentTab );

    const onTabSelected = ( tab: number ) => {
        setSelected( tab );
    }

    return (
        <div className="grid w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">

            {
                tabOptions.map( ( tab ) => (
                    <div key={ tab }>
                        <input checked={ selected === tab }
                               onChange={ () => {
                               } }
                               type="radio" id={ tab.toString() } className="peer hidden"/>
                        <label
                            onClick={ () => onTabSelected( tab ) }
                            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            { tab }
                        </label>
                    </div>
                ) )
            }
        </div>
    )
}
