import React from "react";
import "./CardsStyles.css";

const Cards = ({
  index,
  imgHotel,
  superHost,
  description,
  punctuation,
  star,
  descriptionOfRoom,
  beds
}) => {
  return (
    <>
      <li key={index} className="p-0 mb-3 hotels ">
        <img src={imgHotel} alt="hoteles a menor precio" className="imgHotel" />
        <div className="d-flex justify-content-space-beetwen hotelsInfoContainer">
         
        <div className="btnAndDescription mb-2">
            {superHost && <button className="btnSuperHost mb-0 mt-0">Super Host </button>}
            <p className="descriptionRoom mb-0 h-[28px]">{description}</p>

            <p className="descriptionBed mb-0 mx-2">
              {beds !== null ? `${beds} beds` : ""}
            </p>
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
