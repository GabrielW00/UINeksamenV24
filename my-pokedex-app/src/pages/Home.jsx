import { useState, useMemo, useEffect } from "react";
import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
/*Henter api data, håndterer lasting og feil */
/*Viser kort med pokecard komponent */
/* Laster og feilmelding om infoen ikke stemmer. */

import { isPokemonAvailable, hasHomeSprite } from "../utils";

import CardsContainer from "../components/PokemonCard/CardsContainer";
import PokeCard from "../components/PokemonCard/PokeCard";
import Loader from "../components/ui/Loader";
import TypesCards from "../components/TypeCards/TypesCards";

function Home() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokeMonData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await Axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9"
      );
      const { results } = response.data;

      const requests = results.map((result) => Axios.get(result.url));
      const pokemonResponses = await Promise.all(requests);

      const data = pokemonResponses.map((pokemonRes) => pokemonRes.data);
      setPokemonData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokeMonData();
  }, []);

  const getHomeSprite = useMemo(
    () => (data) => data.sprites.other.home.front_default,
    []
  );

  const getArtworkSprite = useMemo(
    () => (data) => data.sprites.other["official-artwork"]["front_default"],
    []
  );

  if (isLoading) {
    return <Loader></Loader>;
  } else if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <CardsContainer>
        {Array.isArray(pokemonData) &&
          pokemonData.map((pokemon) => {
            let imageValue;
            console.log(pokemon);

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
      <TypesCards />
    </>
  );
}

Home.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Home;
