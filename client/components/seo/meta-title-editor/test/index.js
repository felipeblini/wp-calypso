import { expect } from 'chai';

import {
	nativeToRaw,
	nativeToTokens,
	rawToNative,
	tokensToNative
} from '../mappings';

describe( 'SEO', () => {
	describe( 'Meta', () => {
		describe( 'Title Format Editor', () => {
			describe( '#nativeToRaw', () => {
				it( 'should produce empty strings', () => expect(
					nativeToRaw( [] )
				).to.equal( '' ) );

				it( 'should produce plain-text strings', () => expect(
					nativeToRaw( [ 'just', ' a ', 'string' ] )
				).to.equal( 'just a string' ) );

				it( 'should produce placeholders', () => expect(
					nativeToRaw( [ { type: 'siteName' }, ' | ', { type: 'postTitle' } ] )
				).to.equal( '%site_name% | %post_title%' ) );
			} );

			describe( '#rawToNative', () => {
				it( 'should handle empty strings', () => expect(
					rawToNative( '' )
				).to.eql( [] ) );

				it( 'should handle plain strings', () => expect(
					rawToNative( 'just a string' )
				).to.eql( [ 'just a string' ] ) );

				it( 'should handle placeholders', () => expect(
					rawToNative( '%site_name% | %post_title%' )
				).to.eql( [ { type: 'siteName' }, ' | ', { type: 'postTitle' } ] ) );
			} );

			describe( '#nativeToTokens', () => {
				it( 'should handle empty formats', () => expect(
					nativeToTokens( [] )
				).to.eql( [] ) );

				it( 'should handle plain strings', () => expect(
					nativeToTokens( [ 'just', ' a ', 'string' ] )
				).to.eql( [
					{ value: 'just', isBorderless: true },
					{ value: ' a ', isBorderless: true },
					{ value: 'string', isBorderless: true }
				] ) );

				it( 'should handle placeholders', () => expect(
					nativeToTokens( [
						{ type: 'siteName' },
						' | ',
						{ type: 'postTitle' }
					] )
				).to.eql( [
					'%site_name%',
					{ value: ' | ', isBorderless: true },
					'%post_title%'
				] ) );
			} );

			describe( '#tokensToNative', () => {
				it( 'should handle empty formats', () => expect(
					tokensToNative( [] )
				).to.eql( [] ) );

				it( 'should handle plain strings', () => expect(
					tokensToNative( [
						{ value: 'just', isBorderless: true },
						{ value: ' a ', isBorderless: true },
						{ value: 'string', isBorderless: true }
					] )
				).to.eql( [ 'just', ' a ', 'string' ] ) );

				it( 'should handle placeholders', () => expect(
					tokensToNative( [
						'%site_name%',
						{ value: ' | ', isBorderless: true },
						'%post_title%'
					] )
				).to.eql( [
					{ type: 'siteName' },
					' | ',
					{ type: 'postTitle' }
				] ) );
			} );
		} );
	} );
} );
