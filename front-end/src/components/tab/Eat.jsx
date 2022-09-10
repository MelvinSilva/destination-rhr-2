/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

function Eat() {
  const { id_station } = useParams();
  const [eat, setEat] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/eats/${id_station}`)
      .then((response) => setEat(response.data));
  }, []);

  return (
    <div className={theme ? 'choice-eat' : 'choice-eat-dark'}>
      <div className="container-card">
        {eat.slice(0, 30).map((restaurant) => (
          <li>
            <div className="container-global">
              <div className="container-top">

                <h2>{`${restaurant.name_eat}`.toUpperCase()}</h2>
                <h3>{restaurant.city}</h3>
                <hr />
                {restaurant.adress_eat !== 'null' && (
                  <p>
                    <strong>Adresse : </strong>
                    {restaurant.adress_eat}
                  </p>
                )}
                {restaurant.reduction !== 'null' && (
                  <p>
                    <strong>Réduction avec Carmillon : </strong>
                    {' '}
                    <span>{restaurant.reduction}</span>
                  </p>
                )}
                {restaurant.other_reduction !== 'null' && (
                  <p>
                    <strong>Autre réduction : </strong>
                    {' '}
                    {restaurant.other_reduction}
                  </p>
                )}
              </div>
              <div className="container-bottom">
                {restaurant.picture_eat ? <img src={restaurant.picture_eat} alt="eat" /> : <img src="/images/visuel-non-dispo.png" alt="no-eat" />}
                {restaurant.name_eat && <h3>{restaurant.name_eat}</h3>}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
export default Eat;
