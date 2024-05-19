import React from "react";
import TeamCard from "./TeamCard";
import { teams } from "./types";
/*Viser liste over lag med Card-komponenten */
/*Henter data fra teams, bruker tailwind*/ 
const TypesCards = () => {
  return (
    <div className="mx-auto w-full container w-full d-flex justify-between space-x-4">
      <h1 className="text-4xl font-bold mt-24 ml-4 mb-8">Teams</h1>
      <div className="w-full flex justify-between space-x-4 w-100 mt-12">
        {teams.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    </div>
  );
};

export default TypesCards;
