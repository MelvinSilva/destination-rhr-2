/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AuthTokenContext from './context/AuthTokenContext';
import ThemeContext from './context/ThemeContext';

function Header() {
  const { user } = useContext(AuthTokenContext);
  const { theme } = useContext(ThemeContext);
  const returnHome = useNavigate();
  const [errorConnect, setErrorConnect] = useState();

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogOut = () => {
    if (confirm('Voulez-vous vraiment vous déconnectez ?')) {
      axios.get('http://localhost:5001/users/logout', { withCredentials: true })
        .then(() => {
          returnHome('/');
          refreshPage();
        }).catch((error) => {
          setErrorConnect(error.response.data.error); // reponse de l'API
        });
    } else {
      alert('Vous êtes toujours connecté');
    }
  };

  return (
    <div className={theme ? 'header' : 'header-dark'}>
      <a href="/home/choice-station"><img className="logo" src="/images/logo.png" alt="logo" /></a>
      <span className="title">DESTINATION RHR</span>
      <div className="title-board">
        <span className="letter letter-D" />
        <span className="letter letter-E" />
        <span className="letter letter-S" />
        <span className="letter letter-T" />
        <span className="letter letter-I" />
        <span className="letter letter-N" />
        <span className="letter letter-A" />
        <span className="letter letter-T" />
        <span className="letter letter-I" />
        <span className="letter letter-O" />
        <span className="letter letter-N" />
        <span className="letter letter-blank" />
        <span className="letter letter-R" />
        <span className="letter letter-H" />
        <span className="letter letter-R" />
      </div>
      {!user ? <img className="logo-sncf" src="/images/logosncf.png" alt="logo-sncf" /> : (
        <div className="right">
          <p className="icon-logout" onClick={handleLogOut}>
            <RiLogoutBoxFill />
            {' '}
          </p>
          <p className="text">
            Déconnexion
          </p>
        </div>
      )}
    </div>
  );
}
export default Header;
