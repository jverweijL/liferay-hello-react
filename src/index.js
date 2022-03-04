import React from 'react';
import ReactDOM from 'react-dom';

import HelloBar from './routes/hello-bar/pages/HelloBar';
import HelloFoo from './routes/hello-foo/pages/HelloFoo';
import HelloWorld from './routes/hello-world/pages/HelloWorld';
import './common/styles/index.scss';
import { SimpleGreeting } from './components/simple-greeting/SimpleGreeting';
import { MotionCarousel } from './components/motion-carousel/MotionCarousel';

const App = ({ route }) => {
	if (route === "hello-bar") {
		return <HelloBar />;
	}

	if (route === "hello-foo") {
		return <HelloFoo />;
	}

	if (route === "components") {
		return 
			<div>
				<SimpleGreeting />
				<MotionCarousel />
			</div>;
	}

	return <HelloWorld />;
};

class WebComponent extends HTMLElement {
	connectedCallback() {
		ReactDOM.render(
			<App route={this.getAttribute("route")} />,
			this
		);
	}
}

const ELEMENT_ID = 'liferay-hello-react';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
