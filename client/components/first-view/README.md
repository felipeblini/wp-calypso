First View
==========

A React component that provides support for showing an introductory overlay when a component is first viewed.

Wrap your component in a `FirstViewable` JSX element.

Place the `FirstView` JSX element anywhere -- when it is rendered, the resulting DOM nodes for the overlay will be
appending to the `body` of the document.

The `onFirstViewDismiss` property must be set, and should modify the parent's state such that the `FirstViewable`'s `firstViewActive` property will be false when `render` is called.

By controlling the `FirstView`'s visibility through the `firstViewActive` property, the `FirstViewable` component itself is responsible for
providing any CSS transitions to animate the opening/closing of the `FirstView`. This also keeps the parent's code clean and
readable, with a minimal amount of boilerplate code required to show a `FirstView`.

### Basic Usage

```js
import FirstView from 'components/first-view';
import FirstViewable from 'components/first-view/first-viewable';

const MyComponent = React.createClass( {
	getInitialState() {
		return {
			firstViewActive: false
		};
	},

	render() {
		return (
			<FirstViewable firstViewActive={ this.state.firstViewActive } onFirstViewDismiss={ this.dismissFirstView }>
				<FirstView>
					Content goes here
				</FirstView>
			</FirstViewable>
		);
	},

	dismissFirstView() {
		this.setState( {
			firstViewActive: false
		} );
	}
} );
```
