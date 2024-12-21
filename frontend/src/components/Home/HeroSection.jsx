import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import hero from "../images/gero.jpg"
const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "41",
      subTitle: "Live Projects",
      icon: <FaSuitcase />,
    },
   
    {
      id: 3,
      title: "1000",
      subTitle: "Engaged students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "103",
      subTitle: "Project head",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
          <h1>Discover a Project that Matches</h1>
          <h1>Your Passions and Abilities</h1>
            <p>
            Finding the right project can be a game-changer,
             allowing you to apply your unique skills and pursue your passions.
              Whether you are looking to innovate, collaborate, or make a meaningful impact,
               there is a project out there that aligns perfectly with your interests and abilities.
                Dive into opportunities that challenge and inspire you, and watch your potential unfold.
            </p>
          </div>
          <div className="image">
            <img src={hero} alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;