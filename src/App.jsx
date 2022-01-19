import React from 'react';
import KanyeQuotes from './components/KanyeQuotes';
import GitLink from './components/GitLink';
import './style/app.scss';

const App = () => {
	return (
		<div className="App">
			<KanyeQuotes />
			<GitLink url="https://github.com/VinSjo/kanye-quote-app" />
		</div>
	);
};

export default App;
