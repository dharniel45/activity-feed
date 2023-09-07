import './App.css';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client.js";
import Home from './pages/index.js';
import React, { useState } from 'react';

function App(Component, pageProps) {
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleButtonClick = () => {
    setDataLoaded(false);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1 className='starter'>Keep track of all your NFT projects</h1>
  
        <div className="query">
          <button onClick={handleButtonClick}>Fetch Latest Data</button>
        </div>
      </div>
      
      <div className='data'>
        <ApolloProvider client={client}>
          <Home {...pageProps} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} />
        </ApolloProvider>
      </div>
    </div>
  );
}

export default App;
