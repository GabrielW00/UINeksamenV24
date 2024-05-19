import PropTypes from "prop-types";
import styles from "./PokeCard.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

/*Pokemoninfo navigerer til en side ved klikk, viser navn høyde og vekt */

function PokeCard({ height, id, image, name, weight }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/pokemons/${id}`);
  };

  return (
    <div
      className={`${styles["float-shadow"]} h-64 w-72 rounded-3xl p-2 bg-grayTheme shadow-2xl cursor-pointer`}
      onClick={handleOnClick}
    >
      <div className="h-full w-full ">
        <div className="w-full h-3/5 flex items-center justify-center">
          <img
            className=" h-full"
            src={image}
            alt={name}
            draggable="false"
          ></img>
        </div>

        <div className="h-2/5 px-3 text-sm">
          <p className="">#{id.toString().padStart(4, "0")}</p>

          <div className="h-1/6 w-full "></div>

          <div>
            <h2 className="text-lg capitalize font-bold">{name}</h2>
          </div>

          <div className=" flex justify-between">
            <p className="text-sm text-purpleTheme">Weight: {weight}</p>
            <p className="text-sm text-darkYellowFontColor">Height: {height}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
/*Alle props til pokemonkort. */
PokeCard.propTypes = {
  height: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  openBigCard: PropTypes.func,
};

export default React.memo(PokeCard);
