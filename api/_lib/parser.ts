import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest, Theme } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { balance, images, md, theme, volumeChange } = (query || {});

    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }

    const arr = (pathname || '/').slice(1).split('.');

    let extension = '';
    let title = '';

    if (arr.length === 0) {
        title = '';
    } else if (arr.length === 1) {
        title = arr[0];
    } else {
        extension = arr.pop() as string;
        title = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        balance: getString(balance),
        fileType: extension === 'jpeg' ? extension : 'png',
        images: getArray(images),
        md: md === '1' || md === 'true',
        theme: theme === 'dark' ? 'dark' : 'light',
        title: decodeURIComponent(title),
        volumeChange: getString(volumeChange),
    };

    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);

    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getString(stringOrArray: string[] | string | undefined) {
    if (stringOrArray && Array.isArray(stringOrArray)) {
        if (stringOrArray.length === 0) {
            return ''
        } else {
            return stringOrArray[0]
        }
    } else {
        return stringOrArray ?? ''
    }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
    const defaultImage = theme === 'light'
        ? 'https://llamafolio.com/static/images/og-image-service/llamafolio-logo.svg'
        : 'https://llamafolio.com/static/images/og-image-service/llamafolio-logo.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }

    return images;
}
