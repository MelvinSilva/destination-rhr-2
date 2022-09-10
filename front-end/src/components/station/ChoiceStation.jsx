import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import AuthTokenContext from '../context/AuthTokenContext';
import ThemeContext from '../context/ThemeContext';

function ChoiceStation() {
  const [locality, setLocality] = useState([]);
  const { user } = useContext(AuthTokenContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get('http://localhost:5001/stations')
      .then((response) => setLocality(response.data));
  }, []);

  return (
    <div className={theme ? 'choice-station' : 'choice-station-dark'}>
      <video id="background-video" muted>
        <source src="/images/bg-video.webm" type="video/mp4" />
      </video>
      {user && user.firstname && (
      <h1>
        Bienvenue
        {' '}
        <span>{user.firstname}</span>
        , veuillez choisir votre gare d&apos;arrivée.
      </h1>
      )}
      <div className="container-card">
        {locality.map((town) => (
          <li>
            <div className="card-station">
              <Link to={`/stations/${town.id}/accomodation`}>
                <h3>{town.city}</h3>
                <img src={town.picture} alt="city" />
                {' '}
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
export default ChoiceStation;
