import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Star from "/star.svg";
import PrincipalNav, { Search } from "./Components/Nav/PrincipalNav";
import Texts from "./Components/Texts/Texts";
import Cards from "./Components/Cards/Cards";
import Footer from "./Components/Footer/Footer";

function App() {
  const [categorias, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  async function getData() {
    const fetchData = await fetch("stays.json");
    const datajson = await fetchData.json();
    setCategories(datajson);
    setFilteredCategories(datajson);
  }

  useEffect(() => {
    getData();
  }, []);

  const search = () => {
    const data = categorias.filter((categoria) =>
      categoria.city.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCategories(data);
  };

  return (
    <div>
      <PrincipalNav
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search={search}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
      />

      <Texts />

      <ul className="d-flex list-group mt-5 cardContainer justify-content-center">
        {filteredCategories &&
          filteredCategories.map((hotel, index) => (
            <Cards
              key={index}
              imgHotel={hotel.photo}
              superHost={hotel.superHost}
              description={hotel.type}
              star={Star}
              punctuation={hotel.rating}
              descriptionOfRoom={hotel.title}
            />
          ))}
      </ul>

      <Footer />
    </div>
  );
}

export default App;
