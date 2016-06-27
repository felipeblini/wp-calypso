/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import FirstView from './first-view';

export default ( Wrapped, FirstViewContent ) => {
	return React.createClass( {
		getInitialState: function() {
			return {
				isFirstViewActive: false
			};
		},

		componentDidMount() {
			// we have to slightly delay this so that the CSS transition will show
			process.nextTick( this.showFirstView );
		},

		render() {
			const classes = classNames( 'first-viewable', {
				'is-first-view-active': this.state.isFirstViewActive
			} );

			return (
				<div className={ classes }>
					<FirstView isActive={ this.state.isFirstViewActive } onDismiss={ this.dismissFirstView }>
						<FirstViewContent />
					</FirstView>
					<Wrapped {...this.props} />
				</div>
			);
		},

		showFirstView() {
			this.setState( { isFirstViewActive: true } );
		},

		dismissFirstView() {
			this.setState( { isFirstViewActive: false } );
		}
	} );
};
