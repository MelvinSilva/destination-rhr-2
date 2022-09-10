/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import {
  MdDarkMode, MdLightMode,
} from 'react-icons/md';
import ThemeContext from './context/ThemeContext';

function BtnToggle() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <div
      onClick={toggleTheme}
      className={theme ? 'btn-toggle goLight' : 'btn-toggle goDark'}
    >
      {theme ? <MdDarkMode /> : <MdLightMode />}
    </div>
  );
}

export default BtnToggle;
