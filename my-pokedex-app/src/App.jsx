import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Type from "./pages/Type";
import SearchResult from "./pages/SearchResult";
import Pokemon from "./pages/Pokemon";
import Layout from "./components/layouts/Layout";
import Teams from "./pages/Teams";
import Team from "./pages/Team";
/*Alle imports og routings til siden */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:team" element={<Team />} />
          <Route path="/:type" element={<Type />} />
          <Route path="/searchresults/:pokemon" element={<SearchResult />} />
          <Route path="/pokemons/:pokemon" element={<Pokemon />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
