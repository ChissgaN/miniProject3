import React from "react";
import './CardsStyles.css'

const Cards = ({index, imgHotel, superHost, description, punctuation, star, descriptionOfRoom, }) => {
  return (
    <>
      <li key={index} className="p-0 mb-3 hotels ">
        <img src={imgHotel} alt="hoteles a menor precio" className="imgHotel" />
        <div className="d-flex justify-content-space-beetwen hotelsInfoContainer">
          <div className="btnDescription">
            <button className="btnSuperHost">{superHost}</button>
            <p className="m-0 descriptionRoom">{description}</p>
          </div>
          <div className="divPunctuation">
            <img src={star} alt="" />
            <p className="m-0 ms-2 textToStar">{punctuation}</p>
          </div>
        </div>
        <p>
          <strong>{descriptionOfRoom}</strong>
        </p>
      </li>
    </>
  );
};

export default Cards;