import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import * as PropTypes from 'prop-types';

const sentenceToParagraph = s => <p>{s}.</p>;

function Info(props) {
  return (
    <div className="info">
      <h1>{props.apod.title}</h1>
      <p>{props.apod.explanation.split('.').map(sentenceToParagraph)}</p>
      <span>Timestamp: <time>{props.apod.date}</time></span>
    </div>
  );
}

Info.propTypes = { apod: PropTypes.object };

function App() {
  const [apod, setApod] = useState();

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APOD_KEY}`)
      .then(res => setApod(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <div className="stars" />
      <div className="twinkling" />
      <div className="container">
        {apod ? (
          <>
            <img className="nasa-photo" src={apod.hdurl} alt="nasa photo of the day" />
            <Info apod={apod} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
