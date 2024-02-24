import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Test.css";
import Popup from "./Pop";

const Test = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${currentPage}&format=json`
        );
        setPlanets(response.data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  const toggleResidents = async (planetIndex) => {
    const updatedPlanets = [...planets];
    const planet = updatedPlanets[planetIndex];
    if (!planet.residentsData) {
      try {
        const residentsPromises = planet.residents.map((residentUrl) =>
          axios.get(residentUrl)
        );
        const residentsResponses = await Promise.all(residentsPromises);
        planet.residentsData = residentsResponses.map(
          (response) => response.data
        );
        setPlanets(updatedPlanets);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    } else {
      delete planet.residentsData;
      setPlanets(updatedPlanets);
    }
  };

  return (
    <>
      <div className="heading">StarWars Planets</div>
      <div className="container">
        {planets.map((planet, index) => (
          <>
            <div className="res-data">
              <button
                className="show-btn"
                onClick={() => toggleResidents(index)}
              >
                {planet.residentsData ? "Hide Residents" : "Show Residents"}
              </button>
              {planet.residentsData && (
                <div
                  style={{
                    color: "white",
                    padding: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "5px",
                  }}
                >
                  <h4 style={{ marginBottom: "10px" }}>Residents:</h4>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {planet.residentsData.map((resident, idx) => (
                      <li
                        key={idx}
                        style={{
                          marginBottom: "5px",
                          borderBottom: "1px solid white",
                          paddingBottom: "5px",
                        }}
                      >
                        {resident.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div key={index} className="box">
              <h7>
                {planet.name} <br />
                <small>Rotation Period: {planet.rotation_period}</small>
                <br />
                <small>Orbital Period: {planet.orbital_period}</small>
                <br />
                <small>Diameter: {planet.diameter}</small>
                <br />
                <small>Climate: {planet.climate}</small>
              </h7>
              <div className="clip">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Test;
