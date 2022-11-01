import "./card-list.style.css";
import { useState } from "react";
import Modal from "../modal/modal.jsx";

const CardList = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card-list--container">
      {pokemons.map((pokemon) => (
        <div
          onClick={() => {
            setSelectedPokemon(pokemon);
            setShowModal(true);
          }}
          key={pokemon.id}
          className="card-list--item"
        >
          <div className="card-list-image--container">
            <div className={`type-bg ${pokemon.types[0].type.name}-bg`} />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              className="card-list-image"
            />
          </div>
          <p className="card-id">{`#${String(pokemon.id).padStart(3, "0")}`}</p>
          <div className="card-list-info--container">
            <p className="card-pokemon-name">{`${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }`}</p>
            <img
              src={`https://codeboost.com.br/projetos/pokeapi/img/${pokemon.types[0].type.name}.svg`}
              alt={`${pokemon.types[0].type.name}`}
            />
          </div>
        </div>
      ))}
      {showModal && (
        <Modal setShowModal={setShowModal} selectValue={selectedPokemon} />
      )}
    </div>
  );
};

export default CardList;
