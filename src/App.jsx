import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Star from "/star.svg";
import PrincipalNav, { Search } from "./Components/Nav/PrincipalNav";
import Texts from "./Components/Texts/Texts";
import Cards from "./Components/Cards/Cards";
import Footer from "./Components/Footer/Footer";

function App() {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [inpPeopleValue, setInpPeopleValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  async function getData() {
    const fetchData = await fetch("stays.json");
    const datajson = await fetchData.json();
    setStays(datajson);
    setFilteredStays(datajson);
  }

  useEffect(() => {
    getData();
  }, []);

  const search = () => {
    const data = stays.filter((stay) => {
      const cityMatch = stay.city.toLowerCase().includes(searchValue.toLowerCase());
      const guestsMatch = inpPeopleValue === "" || stay.maxGuests >= parseInt(inpPeopleValue);
      
      return cityMatch && guestsMatch;
    });

    setFilteredStays(data);
  };

  return (
    <div>
      <PrincipalNav
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        inpPeopleValue={inpPeopleValue}
        setInpPeopleValue={setInpPeopleValue}
        search={search}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
      />

      <Texts />

      <ul className="d-flex list-group mt-5 cardContainer justify-content-center">
        {filteredStays &&
          filteredStays.map((hotel, index) => (
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


