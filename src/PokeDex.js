import "./App.css";
import { useState, useEffect, Fragment } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import BarChart from "./barchart";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setPokemons(response.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handlePokemonClick = async (item) => {
    try {
      const response = await axios.get(item.url);
      setPokemonDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredData = () => {
    let data = [...pokemons];
    if (search && search.trim()) {
      data = data.filter((x) => x.name.includes(search.trim()));
    }
    if (sort === "asc") {
      data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }
    if (sort === "desc") {
      data.sort((b, a) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }
    return data;
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <ReactLoading
                  type={"balls"}
                  color={"#ffffff"}
                  height={"20%"}
                  width={"20%"}
                />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <input
              type="search"
              name="name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <b onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
              Pokedex list
            </b>
            {filteredData().map((item, index) => {
              return (
                <div
                  id="cspace"
                  key={`${item.name}-${index}`}
                  onClick={() => handlePokemonClick(item)}
                >
                  {item.name}
                </div>
              );
            })}
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={!!pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <>
            <div style={{ display: "flex" }}>
              <img
                alt={pokemonDetail?.name || ""}
                src={pokemonDetail.sprites?.front_default}
                style={{ padding: "10px" }}
              />
              <table style={{ width: 900 }}>
                <thead>
                  <tr>
                    {["Base stat", "Name"].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pokemonDetail.stats.map((row, i) => (
                    <tr key={i}>
                      <th key={`${i}-${row.base_stat}`}>{row.base_stat}</th>
                      <th key={`${i}-${row.base_stat}`}>{row.stat.name}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <BarChart /> */}
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
