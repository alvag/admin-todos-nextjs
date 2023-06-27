import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { boolean, object, string } from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

export async function GET( req: Request, { params }: Segments ) {

    const { id } = params;

    const todo = await prisma.todo.findFirst( { where: { id } } );

    if ( !todo ) {
        return NextResponse.json( { error: 'Todo not found' }, { status: 404 } );
    }

    return NextResponse.json( todo );
}

const putSchema = object( {
    description: string().optional(),
    completed: boolean().optional(),
} );

export async function PUT( req: Request, { params }: Segments ) {
    const { id } = params;

    let todo = await prisma.todo.findFirst( { where: { id } } );

    if ( !todo ) {
        return NextResponse.json( { error: 'Todo not found' }, { status: 404 } );
    }

    try {
        const { completed, description } = await putSchema.validate( await req.json() );

        const data = { completed, description };

        todo = await prisma.todo.update( { where: { id }, data } );

        return NextResponse.json( todo );
    } catch ( error ) {
        return NextResponse.json( error, { status: 400 } );
    }


}
