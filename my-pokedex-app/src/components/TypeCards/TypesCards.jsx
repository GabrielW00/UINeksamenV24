import React from "react";
import TypeCard from "./TypeCard";
import { types } from "./types";
/*Viser liste over pokemontyper med Typecard komponenten, henter ut info fra types */
const TypesCards = () => {
  return (
    <div className="mx-auto w-full container">
      <h1 className="text-4xl font-bold mt-12 ml-4">Types</h1>
      <div className="type-card-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 d-flex justify-center">
        {types.map((type) => (
          <TypeCard key={type.name} type={type} />
        ))}
      </div>
    </div>
  );
};

export default TypesCards;
