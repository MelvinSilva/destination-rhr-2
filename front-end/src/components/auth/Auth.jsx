import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

function Auth() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme ? 'auth' : 'auth-dark'}>
      <video id="background-video" autoPlay loop muted>
        <source src="/images/bg-video.webm" type="video/mp4" />
      </video>
      <Outlet />
    </div>
  );
}

export default Auth;
