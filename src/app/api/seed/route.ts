import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET( req: Request ) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany( {
        data: [
            { description: 'Piedra del alma', completed: true },
            { description: 'Piedra del poder' },
            { description: 'Piedra del tiempo' },
            { description: 'Piedra del espacio' },
            { description: 'Piedra de la realidad' },
        ]
    } )

    return NextResponse.json( {
        message: 'Seed executed successfully!'
    } );
}
