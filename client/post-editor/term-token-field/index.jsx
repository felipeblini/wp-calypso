/**
 * External dependencies
 */
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import unescapeString from 'lodash/unescape';
import { connect } from 'react-redux';
import _debug from 'debug';

/**
 * Internal dependencies
 */
import { getSelectedSiteId } from 'state/ui/selectors';
import { getEditorPostId } from 'state/ui/editor/selectors';
import { getEditedPost } from 'state/posts/selectors';
import { getTerms } from 'state/terms/selectors';
import TokenField from 'components/token-field';
import TermsConstants from 'lib/terms/constants';
import PostActions from 'lib/posts/actions';
import { recordStat, recordEvent } from 'lib/posts/stats';
import QueryTerms from 'components/data/query-terms';

const debug = _debug( 'calypso:post-editor:editor-terms' );

class TermTokenField extends React.Component {
	componentWillMount() {
		this.boundOnTermsChange = this.onTermsChange.bind( this );
	}

	onTermsChange( selectedTerms ) {
		debug( 'onTermsChange', selectedTerms, this );

		let termStat, termEventLabel;
		if ( selectedTerms.length > this.getPostTerms().length ) {
			termStat = 'term_added';
			termEventLabel = 'Added Term';
		} else {
			termStat = 'term_removed';
			termEventLabel = 'Removed Term';
		}
		recordStat( termStat );
		recordEvent( 'Changed Terms', termEventLabel );

		const { postTerms, taxonomyName } = this.props;
		const terms = cloneDeep( postTerms ) || {};
		terms[ taxonomyName ] = selectedTerms;
		// TODO: REDUX - remove flux actions when whole post-editor is reduxified
		PostActions.edit( { terms } );
	}

	getPostTerms() {
		const { postTerms, taxonomyName } = this.props;

		if ( ! postTerms || ! postTerms[ taxonomyName ] ) {
			return [];
		}

		if ( Array.isArray( postTerms[ taxonomyName ] ) ) {
			return postTerms[ taxonomyName ];
		}

		return Object.keys( postTerms[ taxonomyName ] );
	}

	render() {
		var termNames = ( this.props.terms || [] ).map( function( term ) {
			return term.name;
		} );

		return (
			<label className="editor-drawer__label">
				<span className="editor-drawer__label-text">
					{ this.props.taxonomyLabel }
				</span>
				<QueryTerms
					siteId={ this.props.siteId }
					taxonomy={ this.props.taxonomyName }
				/>
				<TokenField
					value={ this.getPostTerms() }
					displayTransform={ unescapeString }
					suggestions={ termNames }
					onChange={ this.boundOnTermsChange }
					maxSuggestions={ TermsConstants.MAX_TERMS_SUGGESTIONS }
				/>
			</label>
		);
	}
}

TermTokenField.propTypes = {
	siteId: React.PropTypes.number,
	postTerms: React.PropTypes.object,
	taxonomyName: React.PropTypes.string,
	taxonomyLabel: React.PropTypes.string,
	terms: React.PropTypes.arrayOf( React.PropTypes.object ),
};

export default connect( ( state, props ) => {
	const siteId = getSelectedSiteId( state );

	return {
		siteId: siteId,
		terms: getTerms( state, siteId, props.taxonomyName ),
	};
} )( TermTokenField );
