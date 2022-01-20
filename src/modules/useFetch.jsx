import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Based on custom hook by Andrew Gaynor:
 * https://dev.to/techcheck/custom-react-hook-usefetch-eid
 * @param {Object} props
 * @param {String} props.url
 * @param {Function | any} props.onReload
 * @returns {[
 * data: (Object | null),
 * error: (String | null),
 * loading: Boolean,
 * reload: Function
 * ]}
 */
const useFetch = ({ url }) => {
	/**
	 * @type {[(Object|null), React.Dispatch]} Data
	 */
	const [data, setData] = useState(null);
	/**
	 * @type {[(String|null), React.Dispatch<String>]} Error
	 */
	const [error, setError] = useState(null);
	/**
	 * @type {[Boolean, React.Dispatch<Boolean>]} Loading
	 */
	const [loading, setLoading] = useState(false);
	/**
	 * @type {[Number, React.Dispatch<Number>]} ReloadTime
	 */
	const [reloadTime, setReloadTime] = useState(Date.now());

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
	}, [url, reloadTime]);

	const reload = () => setReloadTime(Date.now());

	return [data, error, loading, reload];
};

export default useFetch;
