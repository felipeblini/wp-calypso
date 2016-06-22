/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import page from 'page';

/**
 * Internal dependencies
 */
import HeaderCake from 'components/header-cake';
import AccountInfo from './account-info';

export default React.createClass( {
	displayName: 'GuidedTransfer',

	propTypes: {
		hostSlug: PropTypes.string,
		siteSlug: PropTypes.string.isRequired
	},

	showExporter() {
		page( `/settings/export/${this.props.siteSlug}` );
	},

	getHostInfo( host ) {
		switch ( host ) {
			case 'bluehost': return {
				label: this.translate( 'Bluehost' ),
				url: '#bluehost'
			};
		}
	},

	render: function() {
		const hostInfo = this.getHostInfo( this.props.hostSlug );

		return (
			<div className="guided-transfer">
				<HeaderCake onClick={ this.showExporter }>{ this.translate( 'Guided Transfer' ) }</HeaderCake>
				{ hostInfo && <AccountInfo hostInfo={ hostInfo } /> }
			</div>
		);
	}
} );
