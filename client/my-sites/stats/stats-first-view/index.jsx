/**
 * External dependencies
 */
import React from 'react';

export default React.createClass( {
	render() {
		return (
			<div>
				{ /* TODO: serve this image from proper place */ }
				<img src="https://cldup.com/76mMVk1P5I.png" />
				<h1>{ this.translate( 'Keep track of who\'s viewing your site…' ) }</h1>
				<p>{ this.translate( 'Stats show a bunch of fun numbers, charts, and graphs that detail how many visits your site gets, what posts and pages are popular, and much more.' ) }</p>
			</div>
		);
	}
} );
