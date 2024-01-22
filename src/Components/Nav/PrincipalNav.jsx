import { useState, useEffect } from "react";
import "./PrinNavStyles.css";
import locationSvg from "../../../public/location.svg";
import logo from "../../../public/logo.png";

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
    <div className="search-container">
      <nav className="d-flex justify-content-between navPrin">
        <div className="logoDiv">
          <img className="logo" src={logo} alt="" />
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
    const peopleCount = inpPeopleValue.trim() !== "" ? inpPeopleValue : accounterAdults + accounterChildren;

    search(searchValue, peopleCount);
    onClickCancel();
  };

  const [stays, setStays] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [showModalCities, setShowModalCities] = useState(false);
  const [showModalGuest, setShowModalGuest] = useState(false);

  const handleOpenModalCities = () => {
    setShowModalCities(true);
  };

  const handleCloseModalCities = () => {
    setShowModalCities(false);
  };

  const handelOpenModalGuest = () => {
    setShowModalGuest(true);
  };

  const handelCloseModalGuest = () => {
    setShowModalGuest(false);
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

  const [accounterAdults, setcontadorAdultos] = useState(0);
  const [accounterChildren, setcontadorChildren] = useState(0);

  const restAdults = () => {
    if (accounterAdults > 0) {
      setcontadorAdultos(accounterAdults - 1);
    }
  };

  const addAdults = () => {
    setcontadorAdultos(accounterAdults + 1);
  };

  const restChilds = () => {
    if (accounterChildren > 0) {
      setcontadorChildren(accounterChildren - 1);
    }
  };

  const addChilds = () => {
    setcontadorChildren(accounterChildren + 1);
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
          onClick={() => {handelCloseModalGuest();handleOpenModalCities()}}
          type="text"
          name=""
          id=""
          placeholder="Location"
        />
        <input
          className="pe-3 ps-3 me-3 inpPeople"
          value={inpPeopleValue || ""}
          onChange={(e) => setInpPeopleValue(e.target.value)}
          onClick={() => {handelOpenModalGuest();handleCloseModalCities()}}
          type="text"
          placeholder="Add guests"
        />
        <button
          className="btn btn-danger d-flex btnSearch"
          onClick={handleSearch}
        >
          <span className="material-symbols-outlined me-3 spanBtnSearch">search</span>
          <p className="mb-0 textSea">Search</p>
        </button>
      </div>

      <div className="d-flex pt-3 searchDivSecond">
        <div className="searchUl">
          {showModalCities && (
            <ul className="opCities mt-3">
              {uniqueCities.map((city, index) => (
                <li className="liLocation mb-3" key={index} onClick={() => handleCityClick(city)}>
                  <img className="locaImg me-2" src={locationSvg} alt="Location" />
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {showModalGuest && (
          <div className="container">
            <div className="contenedorAdultos">
              <p>
                <strong>Adults</strong>
              </p>
              <p className="edad">Ages 13 or above</p>
              <div className="marcador">
                <button type="button" onClick={restAdults}>-</button>
                <p className="NcontadorA">{accounterAdults}</p>
                <button type="button" onClick={addAdults}>+</button>
              </div>
            </div>
            <div className="contenedorNiños">
              <p>
                <strong>Children</strong>
              </p>
              <p className="edad">Ages 2-12</p>
              <div className="marcador">
                <button type="button" onClick={restChilds}>-</button>
                <p className="NcontadorA">{accounterChildren}</p>
                <button type="button" onClick={addChilds}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
