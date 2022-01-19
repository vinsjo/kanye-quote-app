import React, { useState, useEffect } from 'react';
import useFetch from '../utils/useFetch';

const KanyeQuotes = ({ title }) => {
	const [outputText, setOutputText] = useState(null);

	const [data, loading, error, reload] = useFetch({
		url: 'https://api.kanye.rest/',
	});

	const updateOutput = () => {
		setOutputText(
			loading
				? 'loading...'
				: error
				? error
				: data && data.quote
				? data.quote
				: null
		);
	};
	useEffect(() => {
		!loading && updateOutput();
	}, [data, loading, error]);

	return (
		<div className="kanye-quotes">
			<h3 className="title">{title}</h3>
			<div className={`container${loading ? ' loading' : ''}`}>
				<p>{outputText}</p>
			</div>
			<button className="refresh" onClick={reload} disabled={loading}>
				Refresh Quote
			</button>
		</div>
	);
};

KanyeQuotes.defaultProps = {
	title: 'Kanye West Quotes',
};

export default KanyeQuotes;
