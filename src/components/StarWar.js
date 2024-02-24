import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Test.css';

const Test = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/?page=${currentPage}&format=json`);
        setPlanets(response.data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const toggleResidents = async (planetIndex) => {
    const updatedPlanets = [...planets];
    const planet = updatedPlanets[planetIndex];
    if (!planet.residentsData) {
      try {
        const residentsPromises = planet.residents.map(residentUrl => axios.get(residentUrl));
        const residentsResponses = await Promise.all(residentsPromises);
        planet.residentsData = residentsResponses.map(response => response.data);
        setPlanets(updatedPlanets);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    } else {
      delete planet.residentsData;
      setPlanets(updatedPlanets);
    }
  };

  return (
    <>
      <div className='heading'>StarWars Planets</div>
      <div className='container'>
        {planets.map((planet, index) => (
          <>
          <div key={index} className='box'>
            <h7>{planet.name} <br />
              <small>Rotation Period: {planet.rotation_period}</small><br />
              <small>Orbital Period: {planet.orbital_period}</small><br />
              <small>Diameter: {planet.diameter}</small><br />
              <small>Climate: {planet.climate}</small>
            </h7>
            <div className='clip'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          </>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  )
}

export default Test;
