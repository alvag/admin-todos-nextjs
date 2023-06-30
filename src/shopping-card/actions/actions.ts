import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): { [ id: string ]: number } => {
    if ( hasCookie( 'cart' ) ) {
        return JSON.parse( getCookie( 'cart' ) as string ?? '{}' );
    }

    return {};
}

export const addProductToCart = ( id: string ): void => {
    const cart = getCookieCart();

    if ( cart[ id ] ) {
        cart[ id ]++;
    } else {
        cart[ id ] = 1;
    }

    setCookie( 'cart', JSON.stringify( cart ) );
}

export const removeProductFromCart = ( id: string ): void => {
    const cart = getCookieCart();

    if ( cart[ id ] ) {
        delete cart[ id ];
        setCookie( 'cart', JSON.stringify( cart ) );
    }
}

export const removeSingleItemFromCart = ( id: string ): void => {
    const cart = getCookieCart();

    if ( cart[ id ] ) {
        cart[ id ]--;

        if ( cart[ id ] <= 0 ) {
            delete cart[ id ];
        }

        setCookie( 'cart', JSON.stringify( cart ) );
    }
}
