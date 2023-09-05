import './App.css';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client.js";
import Home from './pages/index.js';
import React, { useState } from 'react';


function App(Component, pageProps) {
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleButtonClick = () => {
    setDataLoaded(true);
  };



  return (
    <div className="App">
      
      <div className="App-header">
        <h1 className='starter'>The Ultimate Activity Feed to track all your NFT projects</h1>
        
        <div className="query">
        <button onClick={handleButtonClick}>Fetch Latest Data</button>
        </div>
      
      
    </div>
    <div className='data'>
      <ApolloProvider client={client}>
      <Home {...pageProps} dataLoaded={dataLoaded} /> 
    </ApolloProvider>
    </div>
    
    </div>
    
  );
}

export default App;
