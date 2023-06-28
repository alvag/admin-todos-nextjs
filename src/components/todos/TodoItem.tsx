'use client';

import { Todo } from '@prisma/client';
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    todo: Todo;
    toggleTodo: ( id: string, completed: boolean ) => Promise<Todo | void>;
}

export const TodoItem = ( { todo, toggleTodo }: Props ) => {
    const router = useRouter();

    const [ isFetching, setIsFetching ] = useState( false );
    const [ isPending, startTransition ] = useTransition();

    const isCompletedOptimistic = ( isFetching || isPending ) ? !todo.completed : todo.completed;

    const onToggleTodo = async () => {
        setIsFetching( true );
        await toggleTodo( todo.id, !todo.completed );
        setIsFetching( false );

        startTransition( () => {
            router.refresh();
        } );

    }

    return (
        <div className={ isCompletedOptimistic ? styles.todoDone : styles.todoPending }>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div onClick={ () => onToggleTodo() }
                     className={ `
                    flex p-2 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${ isCompletedOptimistic ? 'bg-blue-100' : 'bg-red-100' }
                ` }>
                    {
                        isCompletedOptimistic
                            ? <IoCheckboxOutline size={ 30 }/>
                            : <IoSquareOutline size={ 30 }/>
                    }

                </div>

                <div className="text-center sm:text-left">
                    { todo.description }
                </div>
            </div>
        </div>
    );
};
