import { useState, useEffect } from "react";
import "./PrinNavStyles.css";
import locationSvg from "../../../public/location.svg"

export default function PrincipalNav({
  searchValue,
  setSearchValue,
  inpPeopleValue,
  setInpPeopleValue,
  search,
  isSearchVisible,
  setIsSearchVisible,
}) {
  const clickCancel = () => {
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  };

  return (
    <div className="search-container" /* onClick={clickCancel} */>
      <nav className="d-flex justify-content-between navPrin">
        <div className="logoDiv">
          <img className="logo" src="/public/logo.png" alt="" />
        </div>
        <button
          className="d-flex btn align-items-center OneButton"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <div className="d-flex justify-content-around align-items-center w-100">
            <p className="mb-0 location">Location</p>
            <p className="mb-0 d-flex justify-content-center align-items-center add">
              Add guest
            </p>
            <span className="material-symbols-outlined search">search</span>
          </div>
        </button>
      </nav>
      {isSearchVisible && (
        <Search
          onClickCancel={clickCancel}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inpPeopleValue={inpPeopleValue}
          setInpPeopleValue={setInpPeopleValue}
          search={search}
        />
      )}
    </div>
  );
}

export function Search({
  onClickCancel,
  searchValue,
  setSearchValue,
  inpPeopleValue,
  setInpPeopleValue,
  search,
}) {
  const handleSearch = () => {
    search();
    onClickCancel();
  };

  const [stays, setStays] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [showModalCities, setShowModalCities] = useState(false);
  const handleOpenModalCities = () => {
    setShowModalCities(true);
  };

  const handleCloseModalCities = () => {
    setShowModalCities(false);
  };

  async function getData() {
    const fetchData = await fetch("stays.json");
    const datajson = await fetchData.json();
    setStays(datajson);

    const cities = datajson.map((hotel) => hotel.city);
    const uniqueCitiesArray = [...new Set(cities)];
    setUniqueCities(uniqueCitiesArray);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleCityClick = (city) => {
    setSearchValue(city);
  };

  
  return (
    <div className="m-0 searchDiv">
      <button className="cancel" type="button" onClick={onClickCancel}>
        <span className="material-symbols-outlined spanCancel">cancel</span>
      </button>

      <div className="d-flex rowSearh">
        <input
          className="pe-3 ps-3 inpLoca"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={handleOpenModalCities}
          type="text"
          name=""
          id=""
          placeholder="Location"
        />
        <input
          className="pe-3 ps-3 me-3 inpPeople"
          value={inpPeopleValue || ""}
          onChange={(e) => setInpPeopleValue(e.target.value)}
          onClick={handleCloseModalCities}
          type="text"
          placeholder="Add guests"
        />
        <button
          className="btn btn-danger d-flex ms-5 btnSearch"
          onClick={handleSearch}
        >
          <span className="material-symbols-outlined me-3">search</span>
          Search
        </button>
      </div>

      {showModalCities &&
      <ul className="opCities">
        {uniqueCities.map((city, index) => (
          
          <li className="liLocation mb-3" key={index} onClick={() => handleCityClick(city)}>
            
            <img className="locaImg me-2" src={locationSvg} alt="Location" />
            {city}
            
          </li>
        ))}
      </ul>}

      
</div>
  );
}