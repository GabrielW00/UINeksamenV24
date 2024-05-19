import React, { useEffect, useState } from "react";

import Loader from "../components/ui/Loader";

import { useParams } from "react-router-dom";

import { types } from "../components/TypeCards/types";

import { isPokemonAvailable, hasHomeSprite } from "../utils";

import Axios from "axios";
/*Henter og viser info om spesifikk pokemon, viser loader når pokemon hentes. */
const getTypeDetails = (typeName) => {
  const type = types.find(
    (type) => type.name.toLowerCase() === typeName.toLowerCase()
  );

  return type;
};

function Pokemon() {
  const { pokemon } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [abilities, setAbilities] = useState([]);

  console.log(pokemon);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.toLocaleLowerCase()}`
        );
        const data = await response.json();

        //spør etter abilities
        const requests = data.abilities.map((ability) =>
          Axios.get(ability.ability.url)
        );
        const responses = await Promise.all(requests);

        setData(data);

        setAbilities(responses.map((response) => response.data));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setData(null);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemon]);

  if (isLoading) return <Loader></Loader>;

  if (!data)
    return <h1 className="text-center text-3xl mt-24">Pokemon not found</h1>;

  const getHomeSprite = (data) => data.sprites.other.home.front_default;

  const getArtworkSprite = (data) =>
    data.sprites.other["official-artwork"]["front_default"];

  if (!isPokemonAvailable(data)) {
    return null;
  }

  let imageValue;

  if (hasHomeSprite(data)) {
    imageValue = getHomeSprite(data);
  } else {
    imageValue = getArtworkSprite(data);
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {data.name.toUpperCase()}
          </h1>
        </div>
        <div className="flex justify-center mb-6">
          <img
            src={imageValue}
            alt="Moltres"
            className="w-96 h-96 object-cover"
          />
        </div>
        <div
          className="flex justify-between mb-6 mt-24 pb-6  border-b border-gray-200
          m-24
        "
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              TYPE(S)
            </h2>
            <div className="flex space-x-2">
              {data.types.map((type) => {
                const typeData = getTypeDetails(type.type.name);

                return (
                  <div
                    className={`type-card p-4  rounded-lg shadow-md  cursor-pointer ${type.className} ${typeData.color}`}
                    key={typeData.name}
                  >
                    <img
                      src={typeData.img}
                      alt={typeData.name}
                      className="w-16 h-16 mx-auto"
                    />
                    <p className="text-center mt-2 font-bold">
                      {typeData.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">STATS</h2>
            <ul className="list-none space-y-2 w-96">
              <li className="text-lg flex justify-between">
                <span>Hp:</span>
                <span className="font-semibold">{data.stats[0].base_stat}</span>
              </li>
              <li className="text-lg flex justify-between">
                <span>Attack:</span>
                <span className="font-semibold">{data.stats[1].base_stat}</span>
              </li>
              <li className="text-lg flex justify-between">
                <span>Defense:</span>
                <span className="font-semibold">{data.stats[2].base_stat}</span>
              </li>
              <li className="text-lg flex justify-between">
                <span>Special-Attack:</span>
                <span className="font-semibold">{data.stats[3].base_stat}</span>
              </li>
              <li className="text-lg flex justify-between">
                <span>Special-Defense:</span>
                <span className="font-semibold">{data.stats[4].base_stat}</span>
              </li>
              <li className="text-lg flex justify-between">
                <span>Speed:</span>
                <span className="font-semibold">{data.stats[5].base_stat}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            ABILITIES
          </h2>
          {abilities.map((ability) => (
            <div className="mb-4" key={ability.name}>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {ability.name}
              </h3>
              <p className="text-gray-500 mb-4">
                Effect: {ability.effect_entries[0].effect}
              </p>
              <p className="text-gray-500">
                Short Effect: {ability.effect_entries[0].short_effect}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
