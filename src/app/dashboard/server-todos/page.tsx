export const dynamic = 'force-dynamic';
import { FC } from 'react';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/components';


export const metadata = {
    title: 'Server Actions',
    description: 'Listado de todos consumie`ndo una API REST',
}

interface RestTodosProps {
}

const RestTodosPage: FC<RestTodosProps> = async ( {} ) => {
    const todos = await prisma.todo.findMany( { orderBy: { description: 'asc' } } );

    return (
        <>
            <div className="text-3xl mb-5">Server Actions (Alpha)</div>

            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo/>
            </div>
            <TodosGrid todos={ todos }/>
        </>
    );
};

export default RestTodosPage;
