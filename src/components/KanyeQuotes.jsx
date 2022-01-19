import React, { useState, useEffect } from 'react';
import useFetch from '../utils/useFetch';

const KanyeQuotes = ({ title }) => {
  const [loaded, setLoaded] = useState(false);
  const [outputText, setOutputText] = useState(null);

  const [data, loading, error, reload] = useFetch({
    url: 'https://api.kanye.rest/',
    onLoadStart: () => setLoaded(false),
    onLoadEnd: () => setLoaded(true),
  });

  const updateOutput = () => {
    setOutputText(
      loading
        ? 'loading...'
        : error
        ? error
        : data && data.quote
        ? data.quote
        : null,
    );
  };
  useEffect(() => {
    loaded && updateOutput();
  }, [data, loading, error, loaded]);

  return (
    <div className="kanye-quotes">
      <h3 className="title">{title}</h3>
      <div className={`container${loaded ? ' loaded' : ''}`}>
        <p>{outputText}</p>
      </div>
      <button className="refresh" onClick={reload} disabled={!loaded}>
        Refresh Quote
      </button>
    </div>
  );
};

KanyeQuotes.defaultProps = {
  title: 'Kanye West Quotes',
};

export default KanyeQuotes;
