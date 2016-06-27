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
			shouldRenderChildren: true
		};
	},

	componentDidMount() {
		if ( this.props.isActive ) {
			this.preventPageScrolling();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! nextProps.isActive ) {
			// Need to delay this in order to allow CSS transition to complete first
			setTimeout( this.removeChildren, 200 );
		}
	},

	componentDidUpdate() {
		if ( this.props.isActive ) {
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
			'is-active': this.props.isActive
		} );

		return (
			<RootChild className={ classes }>
				{ this.state.shouldRenderChildren && (
					<div className="first-view__content">
						{ this.props.children }

						<Button onClick={ this.dismiss }>{ this.translate( 'Got it!' ) }</Button>

						<div className="first-view__hide-preference">
							<label>
								<input type="checkbox" checked />
								{ this.translate( 'Don\'t show this again' ) }
							</label>
						</div>
					</div>
				) }
			</RootChild>
		);
	},

	dismiss: function() {
		if ( this.props.onDismiss ) {
			this.props.onDismiss();
		}
	},

	removeChildren: function() {
		this.setState( { shouldRenderChildren: false } );
	},

	preventPageScrolling: function() {
		document.documentElement.classList.add( 'no-scroll' );
	},

	allowPageScrolling: function() {
		document.documentElement.classList.remove( 'no-scroll' );
	}
} );
