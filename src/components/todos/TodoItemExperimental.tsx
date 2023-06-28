'use client';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
    todo: Todo;
    toggleTodo: ( id: string, completed: boolean ) => Promise<Todo | void>;
}

export const TodoItemExperimental = ( { todo, toggleTodo }: Props ) => {

    const [ todoOptimistic, toggleOptimistic ] = useOptimistic(
        todo,
        ( state, newCompleteValue: boolean ) => {
            return {
                ...state,
                completed: newCompleteValue,
            };
        }
    );
    const onToggleTodo = async () => {
        toggleOptimistic( !todoOptimistic.completed );
        try {
            await toggleTodo( todo.id, !todoOptimistic.completed );
        } catch ( e ) {
            toggleOptimistic( !todoOptimistic.completed );
        }
    }

    return (
        <div className={ todoOptimistic.completed ? styles.todoDone : styles.todoPending }>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div onClick={ () => onToggleTodo() }
                     className={ `
                    flex p-2 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${ todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100' }
                ` }>
                    {
                        todoOptimistic.completed
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
