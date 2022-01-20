import React, { useState, useEffect } from 'react';
import useFetch from './modules/useFetch';
import GitLink from './modules/GitLink';
import './style/app.scss';

const App = () => {
	const [output, setOutput] = useState(null);

	const [data, error, loading, reload] = useFetch({
		url: 'https://api.kanye.rest/',
	});

	useEffect(() => {
		if (loading) return;
		setOutput(error ? error : data && data.quote ? data.quote : null);
	}, [loading]);

	return (
		<main className="App">
			<div className="kanye-quotes">
				<h3 className="title">Kanye West Quotes</h3>
				<div className={`container${loading ? ' loading' : ''}`}>
					<p>{output}</p>
				</div>
				<button onClick={reload} disabled={loading}>
					Refresh Quote
				</button>
			</div>
			<GitLink url="https://github.com/VinSjo/kanye-quote-app" />
		</main>
	);
};

export default App;
