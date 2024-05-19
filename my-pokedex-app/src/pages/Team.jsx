import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import CardsContainer from "../components/PokemonCard/CardsContainer";
import PokeCard from "../components/PokemonCard/PokeCard";
import Loader from "../components/ui/Loader";
import { useParams } from "react-router-dom";
import { pokemonData } from "../components/TeamCards/types";
/* Viser liste av pokemon, basert på team*/
function Team() {
  const { team } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
 /*Filtrerer pokemondata */
  const filteredPokemon = pokemonData.filter(
    (pokemon) => pokemon.team.toLowerCase() === team.toLowerCase()
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        console.log(filteredPokemon);
        const requests = filteredPokemon.map((pokemon) =>
          Axios.get(pokemon.url)
        );

        const responses = await Promise.all(requests);
        const data = responses.map((response) => {
          return response.data;
        });
        console.log(data);
        setPokemonDetails(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [team]);

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
      <div
        className="flex  container mx-auto mb-8 flex-col
      "
      >
        <h1 className="text-4xl font-bold mt-24 ml-2 ">
          Team {team.charAt(0).toUpperCase() + team.slice(1)}
        </h1>
        <h1 className="text-2xl mt-4 ml-2 mb-2">Pokemons</h1>
      </div>  
      <CardsContainer> 
        {Array.isArray(pokemonDetails) &&
          pokemonDetails.map((pokemon) => {
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

Team.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Team;
