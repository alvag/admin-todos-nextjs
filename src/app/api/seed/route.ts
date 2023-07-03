import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET( req: Request ) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create( {
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync( '123456' ),
            roles: [ 'client' ],
            todos: {
                create: [
                    { description: 'Piedra del alma', completed: true },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del tiempo' },
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra de la realidad' },
                ]
            }
        }
    } );

    /*await prisma.todo.createMany( {
        data: [
            { description: 'Piedra del alma', completed: true },
            { description: 'Piedra del poder' },
            { description: 'Piedra del tiempo' },
            { description: 'Piedra del espacio' },
            { description: 'Piedra de la realidad' },
        ]
    } )*/

    return NextResponse.json( {
        message: 'Seed executed successfully!'
    } );
}
