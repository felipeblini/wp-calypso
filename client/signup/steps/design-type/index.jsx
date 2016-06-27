/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import StepWrapper from 'signup/step-wrapper';
import SignupActions from 'lib/signup/actions';
import analytics from 'lib/analytics';
import Card from 'components/card';

export default React.createClass( {
	displayName: 'DesignType',

	getChoices() {
		return [
			{ type: 'blog', label: this.translate( 'A list of my latest posts' ), image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 230"><rect x="15" y="15" fill="#E8F0F5" width="280" height="70"/><rect x="15" y="98" fill="#C3EF96" width="194" height="85"/><rect x="15" y="195" fill="#C3EF96" width="194" height="35"/></svg> },
			{ type: 'page', label: this.translate( 'A welcome page for my site' ), image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 230"><rect fill="#E8F0F5" width="310" height="110"/><rect x="114" y="205" fill="#E8F0F5" width="82" height="25"/><rect x="15" y="205" fill="#E8F0F5" width="82" height="25"/><rect x="213" y="205" fill="#E8F0F5" width="82" height="25"/><rect x="15" y="36" fill="#D2DEE6" width="153" height="13"/><rect x="15" y="59" fill="#D2DEE6" width="113" height="13"/><rect x="15" y="82" fill="#C3EF96" width="30" height="13"/><rect x="15" y="125" fill="#C3EF96" width="280" height="65"/></svg> },
			{ type: 'grid', label: this.translate( 'A grid of my latest posts' ), image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 230"><rect x="15" y="15" fill="#E8F0F5" width="280" height="40"/><rect x="114" y="70" fill="#C3EF96" width="82" height="65"/><rect x="15" y="70" fill="#C3EF96" width="82" height="65"/><rect x="213" y="70" fill="#C3EF96" width="82" height="65"/><rect x="114" y="150" fill="#C3EF96" width="82" height="65"/><rect x="15" y="150" fill="#C3EF96" width="82" height="65"/><rect x="213" y="150" fill="#C3EF96" width="82" height="65"/></svg> },
			{ type: 'store', label: this.translate( 'An online store' ), image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 309 231"><defs><path id="a" d="M0 0h309v231H0z"/><mask id="b" x="0" y="0" width="309" height="231" fill="#fff"><use xlinkHref="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><use stroke="#DDE6ED" mask="url(#b)" stroke-width="2" fill="#FFF" xlinkHref="#a"/><path fill="#C4EF96" d="M15 122h82v65H15zM15 202h82v28H15zM211 122h82v65h-82zM211 202h82v28h-82zM113 122h82v65h-82zM113 202h82v28h-82z"/><path fill="#F3F6F8" d="M1 1h307v105H1z"/><path fill="#D2DEE6" d="M78 22h153v13H78zM98 45h113v13H98z"/><path fill="#C4EF96" d="M139 68h31v13h-31z"/></g></svg> },
		];
	},

	renderChoice( choice ) {
		return (
			<Card className="design-type__choice" key={ choice.type }>
				<a className="design-type__choice__link" href="#" onClick={ ( event ) => this.handleChoiceClick( event, choice.type ) }>
					{ choice.image }
					<h2>{ choice.label }</h2>
				</a>
			</Card>
		);
	},

	renderChoices() {
		return (
			<div className="design-type__list">
				{ this.getChoices().map( this.renderChoice ) }
			</div>
		);
	},

	render() {
		return (
			<div className="design-type__section-wrapper">
				<StepWrapper
					flowName={ this.props.flowName }
					stepName={ this.props.stepName }
					positionInFlow={ this.props.positionInFlow }
					fallbackHeaderText={ this.translate( 'What would you like your homepage to look like?' ) }
					fallbackSubHeaderText={ this.translate( 'This will help us figure out what kinds of designs to show you.' ) }
					signupProgressStore={ this.props.signupProgressStore }
					stepContent={ this.renderChoices() } />
			</div>
		);
	},

	handleChoiceClick( event, type ) {
		event.preventDefault();
		event.stopPropagation();
		this.handleNextStep( type );
	},

	handleNextStep( designType ) {
		analytics.tracks.recordEvent( 'calypso_triforce_select_design', { category: designType } );

		SignupActions.submitSignupStep( { stepName: this.props.stepName }, [], { designType } );
		this.props.goToNextStep();
	}
} );
