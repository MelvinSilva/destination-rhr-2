/* eslint-disable no-mixed-operators */
/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTokenContext from './context/AuthTokenContext';

function NoResult() {
  const returnLogin = useNavigate();
  const returnChoiceStation = useNavigate();
  const { user } = useContext(AuthTokenContext);
  const [reloaded, setReloaded] = useState(false);

  useEffect(() => {
    const redirect = () => {
      // si user n'est pas connecté et que RELOADED est VRAI tu retournes sur login
      if (!user && reloaded) { // reloaded est sur true ici
        setTimeout(() => { // methode setTimeout qui permet d'attendre 3s avant de passer à la ligne suivante
          returnLogin('/'); // redirection vers la page login si pas de USER connecté
          setReloaded(false);
        }, 1800);
      } else if (user) {
        setTimeout(() => {
          returnChoiceStation('home/choice-station'); // redirection vers la page choice station pour un USER deja connecté
          setReloaded(false);
        }, 1800);
      }
    };
    redirect();
    setTimeout(() => {
      setReloaded(true);
    }, 500);
  }, [reloaded]);

  return (
    <div className="no-result">
      <img src="/images/error404.png" alt="" />
      <h1>
        Vous n&apos;étes pas connecté ou non autorisé.
      </h1>
      <img className="loading" src="/images/loading.gif" alt="" />
    </div>
  );
}

export default NoResult;
