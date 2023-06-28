import { Todo } from '@prisma/client';

const sleep = ( s: number ) => new Promise( resolve => setTimeout( resolve, s * 1000 ) );

export const updateTodo = async ( id: string, completed: boolean ): Promise<Todo> => {
    await sleep( 2 );
    const body = JSON.stringify( { completed } );

    return await fetch( `/api/todos/${ id }`, {
        method: 'PUT',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    } ).then( res => res.json() );
}

export const createTodo = async ( description: string ): Promise<Todo> => {
    const body = JSON.stringify( { description } );

    return await fetch( '/api/todos', {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    } ).then( res => res.json() );
}

export const deleteCompleted = async () => {
    await fetch( '/api/todos', {
        method: 'DELETE',
    } )
}
