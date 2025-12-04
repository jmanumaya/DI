import React, { useState, useEffect } from 'react';

const SessionTimer = () => {

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, secondsLeft]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(60);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Temporizador de Sesión</h1>
      
      <h2 style={{ fontSize: '3rem', margin: '10px 0' }}>
        {secondsLeft}s
      </h2>

      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleStartPause} style={{ padding: '10px 20px' }}>
          {isRunning ? 'Pausar' : 'Start'}
        </button>

        <button onClick={handleReset} style={{ padding: '10px 20px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SessionTimer;