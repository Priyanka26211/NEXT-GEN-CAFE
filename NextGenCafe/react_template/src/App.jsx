import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('nextgen_cafe_session');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      setUserInfo(sessionData);
      setIsLoggedIn(true);
      setShowIntro(false);
    }

    // Check for table ID in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get('table');
    if (tableId && !savedSession) {
      const userData = {
        tableId: parseInt(tableId),
        userId: `user${tableId}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('nextgen_cafe_session', JSON.stringify(userData));
      setUserInfo(userData);
      setIsLoggedIn(true);
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleLogin = (userData) => {
    localStorage.setItem('nextgen_cafe_session', JSON.stringify(userData));
    setUserInfo(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nextgen_cafe_session');
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  const handleUpdateUser = (updates) => {
    setUserInfo(prev => {
      const next = { ...(prev || {}), ...(updates || {}) };
      localStorage.setItem('nextgen_cafe_session', JSON.stringify(next));
      return next;
    });
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <MainApp userInfo={userInfo} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
}

export default App;