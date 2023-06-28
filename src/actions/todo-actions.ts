'use server';

import { Todo } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleTodo = async ( id: string, completed: boolean ): Promise<Todo> => {
    let todo = await prisma.todo.findFirst( { where: { id } } );

    if ( !todo ) {
        throw 'Todo not found';
    }

    const data = { completed };
    todo = await prisma.todo.update( { where: { id }, data } );
    revalidatePath( '/dashboard/server-todos' );
    return todo;
}

export const createTodo = async ( description: string ): Promise<Todo> => {
    const todo = await prisma.todo.create( { data: { description } } );
    revalidatePath( '/dashboard/server-todos' );
    return todo;
}

export const deleteCompleted = async (): Promise<void> => {
    await prisma.todo.deleteMany( { where: { completed: true } } );
    revalidatePath( '/dashboard/server-todos' );
}
