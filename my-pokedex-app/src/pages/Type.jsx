import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import CardsContainer from "../components/PokemonCard/CardsContainer";
import PokeCard from "../components/PokemonCard/PokeCard";
import Loader from "../components/ui/Loader";
import { useParams } from "react-router-dom";
import { types } from "../components/TypeCards/types";
/*Viser pokemonkort med bilder og informasjon, ved hjelp av pokeCard komponenten */
function Type() {
  const { type } = useParams();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [typeData, setTypeData] = useState({});

  const fetchPokeMonData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await Axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      const { pokemon } = response.data;

      const requests = pokemon.map((result) => Axios.get(result.pokemon.url));
      const pokemonResponses = await Promise.all(requests);

      const data = pokemonResponses.map((pokemonRes) => pokemonRes.data);
      setPokemonData(data);

      //Finn type data fra spesiell type
      const currentTypeData = types.find((t) => t.name.toLowerCase() === type);
      setTypeData(currentTypeData || {});
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokeMonData();
  }, [type]);

  function hasHomeSprite(data) {
    return data?.id < 906 || data?.id > 1008;
  }

  function isPokemonAvailable(data) {
    return data?.id < 1009;
  }

  const getHomeSprite = useMemo(
    () => (data) => data.sprites.other.home.front_default,
    []
  );

  const getArtworkSprite = useMemo(
    () => (data) => data.sprites.other["official-artwork"]["front_default"],
    []
  );

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex items-center space-x-4 container mx-auto mb-8">
        <img
          src={typeData.img}
          alt={typeData.name}
          className="inline-block w-16 h-16"
        />
        <h1 className="text-3xl font-bold">{typeData.name}</h1>
      </div>
      <CardsContainer>
        {Array.isArray(pokemonData) &&
          pokemonData.map((pokemon) => {
            let imageValue;

            if (!isPokemonAvailable(pokemon)) {
              return null;
            }

            if (hasHomeSprite(pokemon)) {
              imageValue = getHomeSprite(pokemon);
            } else {
              imageValue = getArtworkSprite(pokemon);
            }
            return (
              <PokeCard
                height={pokemon.height}
                id={pokemon.id}
                image={imageValue}
                key={pokemon.id}
                name={pokemon.species.name}
                weight={pokemon.weight}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

Type.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Type;
