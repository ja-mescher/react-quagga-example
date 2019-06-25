import React from 'react';
import './App.css';
import ReactQuagga, { useQuagga } from './components/ReactQuagga'

const App = () => {
  const scannerSupported = useQuagga()

  if(!scannerSupported) return null
  return (
    <ReactQuagga
      onDetected={(data) => console.warn(data)}
    />
  )
}

export default App;
