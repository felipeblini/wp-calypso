/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

export default React.createClass( {
	getInitialState() {
		return {
			isFirstViewActive: false
		};
	},

	componentDidMount() {
		if ( this.props.isFirstViewActive ) {
			// we have to slightly delay this so that the CSS transition will show
			process.nextTick( this.showFirstView );
		}
	},

	componentWillReceiveProps( nextProps ) {
		this.setState( {
			isFirstViewActive: nextProps.isFirstViewActive
		} );
	},

	render() {
		const children = this.cloneChildrenAndSetupFirstViewProps();
		const classes = classNames( 'first-viewable', {
			'first-view-active': this.state.isFirstViewActive
		} );

		return (
			<div className={ classes }>
				{ children }
			</div>
		);
	},

	cloneChildrenAndSetupFirstViewProps() {
		return React.Children.map( this.props.children, ( child ) => {
			// TODO: Is there a way to only do this for `FirstView`-'derived' components
			return React.cloneElement( child, {
				isFirstViewActive: this.state.isFirstViewActive,
				onFirstViewDismiss: this.props.onFirstViewDismiss
			} );
		}, this );
	},

	showFirstView() {
		this.setState( { isFirstViewActive: true } );
	}
} );
