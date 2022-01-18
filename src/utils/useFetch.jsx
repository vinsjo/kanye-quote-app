import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = ({ url = null }) => {
  const [refreshTime, setRefreshTime] = useState(Date.now());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const refresh = () => setRefreshTime(Date.now());

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        setLoading(true);
        setData(null);
        setError(null);
        const response = await axios.get(url, { cancelToken: source.token });
        setLoading(false);
        if (response.data.content) setData(response.data.content);
        if (response.data) setData(response.data);
      } catch (err) {
        setLoading(false);
        setError(`An error occurred: ${err}`);
      }
    })();
    return () => source.cancel();
  }, [url, refreshTime]);

  return { data, loading, error, refresh };
};

export default useFetch;
