'use client';

import { Todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { TodoItem } from './TodoItem';
// import { todosHelper } from '@/helpers';
import { todoActions } from '@/actions'


interface Props {
    todos?: Todo[];
}

export const TodosGrid = ( { todos = [] }: Props ) => {

    const router = useRouter();

    /*const toggleTodo = async ( id: string, completed: boolean ) => {
        await todosHelper.updateTodo( id, completed );
        router.refresh();
    }*/

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos?.map( ( todo ) => {
                    return <TodoItem key={ todo.id } todo={ todo } toggleTodo={ todoActions.toggleTodo }/>
                } )
            }
        </div>
    );
};
