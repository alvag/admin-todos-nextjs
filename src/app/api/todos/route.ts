import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET( req: Request ) {

    const { searchParams } = new URL( req.url );
    const take = Number( searchParams.get( 'take' ) || '10' );
    const skip = Number( searchParams.get( 'skip' ) || '0' );

    if ( isNaN( take ) ) {
        return NextResponse.json( { error: 'Invalid take parameter' }, { status: 400 } );
    }

    if ( isNaN( skip ) ) {
        return NextResponse.json( { error: 'Invalid skip parameter' }, { status: 400 } );
    }

    const todos = await prisma.todo.findMany( {
        take,
        skip,
    } );

    return NextResponse.json( todos );
}

export async function POST( req: Request ) {

    const body = await req.json();

    const todo = await prisma.todo.create( { data: body } );

    return NextResponse.json( todo );
}
