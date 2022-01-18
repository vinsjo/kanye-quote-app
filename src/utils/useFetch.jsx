import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = ({ url, onLoadStart, onLoadEnd }) => {
  const [refreshTime, setRefreshTime] = useState(Date.now());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const effectCallback = () => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        if (onLoadStart) onLoadStart();
        setLoading(true);
        setData(null);
        setError(null);
        const response = await axios.get(url, { cancelToken: source.token });
        setLoading(false);
        if (response.data) setData(response.data);
      } catch (err) {
        setLoading(false);
        setError(`An error occurred: ${err}`);
      }
      if (onLoadEnd) onLoadEnd();
    })();
    return () => source.cancel();
  };

  useEffect(effectCallback, [url, refreshTime]);

  const reload = () => {
    setRefreshTime(Date.now());
  };

  return [data, loading, error, reload];
};

export default useFetch;
