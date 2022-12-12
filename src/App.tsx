import { useState, useEffect, ChangeEvent } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import { getData } from "./utils/data.utils";
import "./App.css";
import axios from "axios";

export type Pokemon = {
  url: string;
  name: string;
  id: number;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
};

type Pokemons = {
  results: Pokemon[];
};

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsArray = [];

      const response = await getData<Pokemons>(
        "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"
      );
      const results = response.results;

      for (const pokemon of results) {
        const res = await axios.get(pokemon.url);
        const data = res.data;
        pokemonsArray.push(data);
      }

      setPokemons(pokemonsArray);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const newfilteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredPokemons(newfilteredPokemons);
  }, [pokemons, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
