import React from "react";
import "./modal.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Pokemon } from "../../utils/types";
import { getData } from "../../utils/data.utils";
const statsName = [
  "HP",
  "Attack",
  "Defense",
  "Sp. Attack",
  "Sp. Defense",
  "Speed",
];

type ModalProps = {
  setShowModal: (showModal: boolean) => void;
  selectedPokemon: Pokemon;
};

type Weaknesses = {
  damage_relations: {
    double_damage_from: [
      {
        name: string;
      }
    ];
  };
};

const Modal = ({ setShowModal, selectedPokemon }: ModalProps) => {
  const [showMore, setShowMore] = useState(false);
  const [weaknesses, setWeaknesses] = useState<Weaknesses | null>(null);
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    async function fetchType() {
      const response = await getData<Weaknesses>(
        `https://pokeapi.co/api/v2/type/${selectedPokemon.types[0].type.name}`
      );
      setWeaknesses(response);
      setFetchDone(true);
    }
    fetchType();
  }, []);

  return (
    <>
      <div className="modal--container">
        <div className="modal-pokemon-image--container">
          <div className="modal--background">
            <img
              src={`https://codeboost.com.br/projetos/pokeapi/img/bg-${selectedPokemon.types[0].type.name}.svg`}
              alt={`${selectedPokemon.type} background`}
            />
          </div>
          <div className="modal--image-content">
            <div className="modal--type-container">
              <img
                src={`https://codeboost.com.br/projetos/pokeapi/img/${selectedPokemon.types[0].type.name}.svg`}
                alt={`${selectedPokemon.types[0].type.name}`}
                className="modal-type-image"
              />
            </div>
            <div className="modal--image-container">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                alt={selectedPokemon.name}
                className="modal-image"
              />
            </div>
          </div>
        </div>
        <div className="modal--content">
          <div className="modal--content-container">
            <div className="modal--name-id">
              <p className="modal-name">{`${
                selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)
              }`}</p>
              <p className="modal-id">{`#${String(selectedPokemon.id).padStart(
                3,
                "0"
              )}`}</p>
            </div>
            <div className="modal-type-container">
              {selectedPokemon.types.map((type, index) => {
                return (
                  <div key={index} className="modal-type">
                    <p className={`type-text ${type.type.name}-text`}>
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="modal-stats-container">
              <div className="height-stats">
                <p className="modal-stat-title">Height</p>
                <p className="modal-stat-value">{`${
                  Number(selectedPokemon.height) / 10
                }m`}</p>
              </div>
              <div className="weight-stats">
                <p className="modal-stat-title">Weight</p>
                <p className="modal-stat-value">{`${
                  Number(selectedPokemon.weight) / 10
                }kg`}</p>
              </div>
              <div className="abilities-stats">
                <p className="modal-stat-title">Abilities</p>
                <p className="modal-stat-value">{`${
                  selectedPokemon.abilities[0].ability.name
                    .charAt(0)
                    .toUpperCase() +
                  selectedPokemon.abilities[0].ability.name.slice(1)
                }`}</p>
                {selectedPokemon.abilities.length > 1 && (
                  <div className="abilities-container">
                    <button
                      className={`ver-mais-btn type-text ${selectedPokemon.types[0].type.name}-text`}
                      onClick={() => setShowMore(!showMore)}
                    >
                      Ver mais...
                    </button>
                    <div className="extra-abilities-container">
                      {showMore &&
                        selectedPokemon.abilities.slice(1).map((ability) => {
                          return (
                            <motion.div
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{
                                y: -50,
                                opacity: 0,
                                scale: 0,
                                transition: { duration: 1 },
                              }}
                              key={ability.ability.name}
                            >
                              <p
                                className={`extra-abilities-text type-text ${selectedPokemon.types[0].type.name}-text`}
                              >
                                {ability.ability.name.charAt(0).toUpperCase() +
                                  ability.ability.name.slice(1)}
                              </p>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="weaknesses-stats">
              <p className="stats-title">Weaknesses</p>
              <div className="weaknesses-container modal-type-container">
                {fetchDone &&
                  weaknesses &&
                  weaknesses.damage_relations.double_damage_from.map(
                    (weakness) => {
                      return (
                        <div key={`${weakness.name}`} className="modal-type">
                          <p className={`type-text ${weakness.name}-text`}>
                            {weakness.name.charAt(0).toUpperCase() +
                              weakness.name.slice(1)}
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
            <div className="other-stats">
              <p className="stats-title">Stats</p>
              <div className="stats-container">
                {selectedPokemon.stats.map((stat, index) => {
                  return (
                    <ul
                      key={`${statsName[index]} ${stat.base_stat} ${index}`}
                      className="stats-list"
                    >
                      <li className="stats-item">
                        <p className="stats-name">{statsName[index]}</p>
                        <div className="stats-bar">
                          <div
                            style={{
                              width:
                                (Number(stat.base_stat) * 280) / 100 > 280
                                  ? 280 / 10 + "rem"
                                  : (Number(stat.base_stat) * 280) / 100 / 10 +
                                    "rem",
                            }}
                            className="stats-bar-percentage"
                          />
                          <div className="stats-division">
                            <ul className="list-separator">
                              <li className="stats-separatos"></li>
                              <li className="stats-separatos"></li>
                              <li className="stats-separatos"></li>
                              <li className="stats-separatos"></li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="backdrop" onClick={() => setShowModal(false)}></div>
    </>
  );
};

export default Modal;
