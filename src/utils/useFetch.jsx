import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = ({ url }) => {
	const [refreshTime, setRefreshTime] = useState(Date.now());
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const reload = () => setRefreshTime(Date.now());

	useEffect(() => {
		const source = axios.CancelToken.source();
		(async () => {
			try {
				setLoading(true);
				setData(null);
				setError(null);
				const response = await axios.get(url, {
					cancelToken: source.token,
				});
				if (response.data) setData(response.data);
			} catch (err) {
				setError(`An error occurred: ${err}`);
			}
			setLoading(false);
		})();
		return () => source.cancel();
	}, [url, refreshTime]);

	return [data, loading, error, reload];
};

export default useFetch;
