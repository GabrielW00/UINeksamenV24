import React from "react";
import mainLogo from "../../assets/pokedexpnglogo.png";
import SearchBar from "../ui/SearchBar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function NavBar({ onSearch }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };/*Navigasjon med Teams,logo og proptypes */
  return (
    <header className="w-full h-20 flex items-center justify-center  px-10 rounded-bl-3xl rounded-br-3xl">
      <div className="container  mx-0">
        <div className="hidden items-center justify-between mx-0  md:flex md:w-full">
          <div className="flex items-center justify-start space-x-4 w-1/2">
            <img
              src={mainLogo}
              alt="PokeDex Logo"
              draggable="false"
              className="w-150 h-40 cursor-pointer"
              onClick={handleClick}
            />

            <div
              className="text-2xl font-bold text-purpleTheme p-8 cursor-pointer"
              onClick={() => navigate("/teams")}
            >
              Teams
            </div>
          </div>

          <div className="flex justify-end w-1/2  ">
            <SearchBar placeHolder="Søk pokemon med navn eller id" />
          </div>
        </div>

        <div className="flex items-center justify-center mx-auto w-full md:hidden ">
          <div className="flex justify-center w-full ">
            <SearchBar placeHolder="Search Pokemon" onSearch={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}
/* prop for navbaren*/ 
NavBar.propTypes = {
  onSearch: PropTypes.func,
};

export default NavBar;
