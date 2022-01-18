import React from 'react';
import useFetch from '../utils/useFetch';

const KanyeQuotes = ({ title }) => {
  const { data, loading, error, refresh } = useFetch({
    url: 'https://api.kanye.rest/',
  });

  return (
    <div className="kanye-quotes">
      <h3 className="title">{title}</h3>
      <div className="quote-container">
        <p>
          {loading
            ? 'loading...'
            : error
            ? error
            : data && data.quote
            ? data.quote
            : null}
        </p>
      </div>
      <button className="refresh" onClick={refresh}>
        Refresh Quote
      </button>
    </div>
  );
};

KanyeQuotes.defaultProps = {
  title: 'Kanye West Quotes',
};

export default KanyeQuotes;
