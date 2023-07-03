import { FC } from 'react';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/components';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { redirect } from 'next/navigation';


export const metadata = {
    title: 'Listado de Todos',
    description: 'Listado de todos consumiendo una API REST',
}

interface RestTodosProps {
}

const RestTodosPage: FC<RestTodosProps> = async ( {} ) => {
    const user = await getUserSessionServer();

    if ( !user ) {
        redirect( '/api/auth/signin' );
    }

    const todos = await prisma.todo.findMany( {
        where: {
            userId: user.id
        },
        orderBy: { description: 'asc' }
    } );

    return (
        <>
            <div className="text-3xl mb-5">REST Todos</div>

            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo/>
            </div>
            <TodosGrid todos={ todos }/>
        </>
    );
};

export default RestTodosPage;
