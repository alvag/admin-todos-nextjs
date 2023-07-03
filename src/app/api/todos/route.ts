import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { boolean, object, string } from 'yup';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

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

const postSchema = object( {
    description: string().required(),
    completed: boolean().optional().default( false ),
} );

export async function POST( req: Request ) {
    const user = await getUserSessionServer();
    if ( !user ) {
        return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
    }

    try {
        const { description, completed } = await postSchema.validate( await req.json() );

        const data = { completed, description, userId: user.id };

        const todo = await prisma.todo.create( { data } );

        return NextResponse.json( todo );
    } catch ( error ) {
        return NextResponse.json( error, { status: 400 } );
    }
}

export async function DELETE( req: Request ) {
    const user = await getUserSessionServer();
    if ( !user ) {
        return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
    }

    try {
        await prisma.todo.deleteMany( { where: { completed: true, userId: user.id } } );
    } catch ( error ) {
        return NextResponse.json( error, { status: 400 } );
    }
}
