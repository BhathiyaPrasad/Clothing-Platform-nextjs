import React from "react";
import Image from "next/image";
import product from "../../assests/images/COVER WEB.jpg";
import testproduct from "../../assests/images/test.webp";
import "../Styles/title.css";

function Title({ text }) {
  return (
    <div className="center">
      <h1 className="title">{text}</h1>
    </div>
  );
}

export default Title;
