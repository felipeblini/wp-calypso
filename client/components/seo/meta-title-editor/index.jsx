import React, { Component, PropTypes } from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import identity from 'lodash/identity';
import map from 'lodash/map';
import { connect } from 'react-redux';

import SegmentedControl from 'components/segmented-control';
import TokenField from 'components/token-field';
import { localize } from 'i18n-calypso';

import {
	rawToNative,
	nativePlaceholder,
	nativeToRaw,
	nativeToTokens,
	tokensToNative
} from './mappings';

const titleTypes = translate => [
	{ value: 'frontPage', label: translate( 'Front Page' ) },
	{ value: 'posts', label: translate( 'Posts' ) },
	{ value: 'pages', label: translate( 'Pages' ) },
	{ value: 'groups', label: translate( 'Categories & Tags' ) },
	{ value: 'archives', label: translate( 'Archives' ) }
];

const validTokens = translate => ( {
	siteName: translate( 'Site Name' ),
	tagline: translate( 'Tagline' ),
	postTitle: translate( 'Post Title' ),
	pageTitle: translate( 'Page Title' ),
	groupTitle: translate( 'Category/Tag Title' ),
	date: translate( 'Date' )
} );

const tokenMap = {
	frontPage: [ 'siteName', 'tagline' ],
	posts: [ 'siteName', 'tagline', 'postTitle' ],
	pages: [ 'siteName', 'tagline', 'pageTitle' ],
	groups: [ 'siteName', 'tagline', 'groupTitle' ],
	archives: [ 'siteName', 'tagline', 'date' ]
};

const displayTokens = translate => s => {
	const display = find( validTokens( translate ), s ) || s;

	return display;
};

export class MetaTitleEditor extends Component {
	constructor() {
		super();

		this.state = {
			type: 'frontPage',
			tokens: []
		};

		this.switchType = this.switchType.bind( this );
		this.update = this.update.bind( this );
	}

	switchType( { value: type } ) {
		this.setState( { type } );
	}

	update( rawValues ) {
		const { saveMetaTitle } = this.props;
		const { type } = this.state;

		const r2n = rawToNative;
		const n2r = nativeToRaw;
		const n2t = nativeToTokens;
		const t2n = tokensToNative;

		const ts = validTokens( identity );
		console.log( ts );
		rawValues.forEach( v => {
			console.log( v );

			map( ts, (k, s) => {
				if ( s !== v ) { return; }

				console.log( `key found at ${ k }` );
			} );
		} );

		//this.setState( { tokens } );
	}

	render() {
		const {
			disabled = false,
			translate = identity
		} = this.props;
		const {
			type,
			tokens
		} = this.state;

		return (
			<div>
				<SegmentedControl options={ titleTypes( translate ) } onSelect={ this.switchType } />
				<TokenField
					disabled={ disabled }
					displayTransform={ displayTokens( translate ) }
					onChange={ this.update }
					suggestions={ [
						translate( 'Site Name' ),
						translate( 'Post Title' )
					] }
					value={ nativeToTokens( rawToNative( '%site_name% | %post_title%' ) ) }
				/>
			</div>
		);
	}
}

MetaTitleEditor.propTypes = {
	disabled: PropTypes.bool
};

const mapStateToProps = state => ( {
	titleFormats: {
		frontPage: '%site_name% | %tagline%',
		posts: '%post_title% - %site_name%',
		pages: '%page_title% - %site_name%',
		groups: '%site_name% > %group_title%',
		archives: '%site_name% (%date%)'
	}
} );

const mapDispatchToProps = dispatch => ( {
	saveMetaTitle: title => console.log( { type: 'SEO_SET_META_TITLE', title } )
} );

export default connect( mapStateToProps, mapDispatchToProps )( localize( MetaTitleEditor ) );
