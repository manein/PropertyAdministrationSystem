import React from 'react';
import './App.css';
import Navbar from './NavBar';
import VideoBackground from './Video';

function App() {
  return (
    <div>
      <Navbar />
      <VideoBackground />
      <div className="App">
        <header className="App-header">
          <h1>Property Administration System</h1>
        </header>
      </div>
    </div>
  );
}

export default App;