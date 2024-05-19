import React from "react";
import PropTypes from "prop-types";
import styles from "./TeamCard.module.css";
import { useNavigate } from "react-router-dom";
/*Info om et lag med navn og bilde*/ 
const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/team/${String(team.name).toLowerCase()}`);
  };

  return (
    <div
      className={` p-4 ${styles["float-shadow"]}  rounded-lg shadow-md  cursor-pointer ${team.className}
        bg-gradient-to-r from-yellow-200 to-purple-200
        w-96 h-96
      `}
      onClick={handleOnClick}
    >
      <p className="text-center mt-2 mb-8  font-bold text-2xl">
        Team {team.name}
      </p>
      <img src={team.img} alt={team.name} className="w-60 h-60 mx-auto" />
    </div>
  );
};
/*Alle props for kortene */
TeamCard.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamCard;
