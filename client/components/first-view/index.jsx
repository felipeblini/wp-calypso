/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import RootChild from 'components/root-child';

export default React.createClass( {
	getInitialState() {
		return {
			renderChildren: true
		};
	},

	componentDidMount() {
		if ( this.props.firstViewActive ) {
			this.preventPageScrolling();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! nextProps.isFirstViewActive ) {
			// Need to delay this in order to allow CSS transition to complete first
			setTimeout( this.removeChildren, 200 );
		}
	},

	componentDidUpdate() {
		if ( this.props.isFirstViewActive ) {
			this.preventPageScrolling();
		} else {
			this.allowPageScrolling();
		}
	},

	componentWillUnmount() {
		this.allowPageScrolling();
	},

	render: function() {
		const classes = classNames( 'wp-content', 'first-view', {
			active: this.props.isFirstViewActive
		} );

		return (
			<RootChild className={ classes }>
				{ this.state.renderChildren && (
					<div className="first-view__content">
						<div>
							{ this.props.children }
						</div>

						<Button onClick={ this.dismiss }>Got it!</Button>

						<div className="first-view__hide-preference">
							<label>
								<input type="checkbox" checked />
								Don't show this again
							</label>
						</div>
					</div>
				) }
			</RootChild>
		);
	},

	dismiss: function() {
		if ( this.props.onFirstViewDismiss ) {
			this.props.onFirstViewDismiss();
		}
	},

	removeChildren: function() {
		this.setState( { renderChildren: false } );
	},

	preventPageScrolling: function() {
		document.documentElement.classList.add( 'no-scroll' );
	},

	allowPageScrolling: function() {
		document.documentElement.classList.remove( 'no-scroll' );
	}
} );
