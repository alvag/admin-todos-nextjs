import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
