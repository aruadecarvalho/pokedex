import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";
import axios from "axios";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    async function getPokemonsURL() {
      const pokemonsArray = [];

      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"
      );

      const results = response.data.results;

      for (const pokemon of results) {
        const res = await axios.get(pokemon.url);
        const data = res.data;
        pokemonsArray.push(data);
      }

      console.log("array dos pokemons", pokemonsArray);

      setPokemons(pokemonsArray);
    }

    getPokemonsURL();
  }, []);

  useEffect(() => {
    const newfilteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLocaleLowerCase().includes(searchField);
    });
    console.log("array filtrado", newfilteredPokemons);
    setFilteredPokemons(newfilteredPokemons);
  }, [pokemons, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <SearchBox
        className={"pokemon-search-box"}
        placeholder={"Search name"}
        onChangeHandler={onSearchChange}
      />
      <CardList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;
