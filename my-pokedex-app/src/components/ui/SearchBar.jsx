import { useState, useRef } from "react";
import React from "react";
import PropTypes from "prop-types";
import miniLogo from "../../assets/pokedex_mini_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

/*Definerer searchbar som mottar props fra placeholder og onsearch */
/* starter statesearchterm med usestate*/
/* hendelser fra input, icon og tastetrykk. */

function SearchBar({ placeHolder }) {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleIconClick = () => {
    inputRef.current.focus();
  };

  const handleSmallScreenClick = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/searchresults/${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/searchresults/${searchTerm}`);
    }
  };

  return (
    <div className=" items-center justify-between w-96 p-2 rounded-3xl shadow-md bg-white focus-within:ring-2 focus-within:ring-yellowTheme focus-within:outline-none">
      <div className=" flex items-center justify-between w-full">
        <img
          src={miniLogo}
          alt="PokeDex Logo"
          className="w-9 h-9 hidden md:block "
          onClick={handleIconClick}
          draggable="false"
        />
        <img
          src={miniLogo}
          alt="PokeDex Logo"
          className="w-9 h-9 block md:hidden cursor-pointer"
          onClick={handleSmallScreenClick}
          draggable="false"
        />
        <form
          className="mx-2 w-full outline-none bg-white text-purpleTheme"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={placeHolder}
            ref={inputRef}
            className="mx-2 w-full outline-none bg-white text-purpleTheme"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </form>
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-800 mr-2"
          size="lg"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
