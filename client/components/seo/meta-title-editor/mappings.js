// Maps between different title format formats
//
// raw is a string like: '%site_name% | %tagline%'
//                        \_________/   \_______/
//                             |            |
//                             \------------\- placeholders
//
// native is an array of plain-text strings and tags
//   [ { type: 'postTitle' }, ' on ', { type: 'siteName' } ]
//     \___________________/          \__________________/
//               |                     |
//               \---------------------\------ tags
//
// tokens is an array of "tokens" expected by `TokenField`
//   @see README for `TokenField`
//   [ '%site_name%', { value: ' | ', isBorderless: true }, '%post_title%' ]
//

import camelCase from 'lodash/camelCase';
import compact from 'lodash/compact';
import isString from 'lodash/isString';
import join from 'lodash/join';
import map from 'lodash/map';
import snakeCase from 'lodash/snakeCase';
import split from 'lodash/split';

const placeholderPattern = /(%[a-zA-Z_]+%)/;
const isPlaceholder = s => placeholderPattern.test( s );
const placeholderToTag = p => isPlaceholder( p ) ? ( { type: camelCase( p.slice( 1, -1 ) ) } ) : p;

const tagToPlaceholder = n => isString( n ) ? n : `%${ snakeCase( n.type ) }%`;
const tagToToken = n => isString( n ) ? { value: n, isBorderless: true } : tagToPlaceholder( n );

const tokenToTag = t => isString( t ) ? placeholderToTag( t ) : t.value;

export const rawToNative = r => compact( map( split( r, placeholderPattern ), placeholderToTag ) );
export const nativeToRaw = n => join( map( n, tagToPlaceholder ), '' );
export const nativeToTokens = n => compact( map( n, tagToToken ) );
export const tokensToNative = t => compact( map( t, tokenToTag ) );
