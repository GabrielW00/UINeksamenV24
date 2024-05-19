import React from "react";
import PropTypes from "prop-types";
import styles from "./TypeCard.module.css";
import { useNavigate } from "react-router-dom";
/* Viser informasjon om type med navn og bilde når den trykkes på */
/*Navigerer vidre til siden */
const TypeCard = ({ type }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/${String(type.name).toLowerCase()}`);
  };

  return (
    <div
      className={`type-card p-4 ${styles["float-shadow"]}  rounded-lg shadow-md  cursor-pointer ${type.className}`}
      onClick={handleOnClick}
    >
      <img src={type.img} alt={type.name} className="w-16 h-16 mx-auto" />
      <p className="text-center mt-2 font-bold">{type.name}</p>
    </div>
  );
};

TypeCard.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
};

export default TypeCard;
