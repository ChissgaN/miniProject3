import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Star from "/star.svg";
import PrincipalNav, {Search} from './Components/Nav/PrincipalNav';
import Texts from './Components/Texts/Texts';
import Cards from './Components/Cards/Cards';
import Footer from './Components/Footer/Footer';


function App() {
  const [hotels, setHotels] = useState([]);

  async function getData() {
    const fetchData = await fetch("stays.json");

    const datajson = await fetchData.json();

    setHotels(datajson);
  }

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <div>
      <PrincipalNav/>
      
      <Texts/>
      
      <ul className="d-flex list-group mt-5 cardContainer justify-content-center">
        {hotels &&
          hotels.map((hotel, index) => (
            <Cards
              key={index}
              imgHotel={hotel.photo}
              superHost={hotel.city}
              description={hotel.type}
              star={Star}
              punctuation={hotel.rating}
              descriptionOfRoom={hotel.title}
            />
          ))}
      </ul>

      <Footer/>

    </div>
  )
}

export default App