import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {

  const [helloWorld, setHelloWorld] = useState('');

  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/test`);
      setHelloWorld(response.data.message);
    }
    fetchData();

  }, []);

  return (
    <div className="App">
      <h1>Testing</h1>
      <h1>{helloWorld}</h1>
    </div>
  );
}

export default App;
