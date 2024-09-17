import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [helloWorld, setHelloWorld] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://scamazon-server.vercel.app/api/test');
      setHelloWorld(response.data.hello);
    }
    fetchData();

  }, []);

  return (
    <div className="App">
      <h1>{helloWorld}</h1>
    </div>
  );
}

export default App;
