import React, { useState } from "react";
import "./Header.css";
import top_set_nor from "../../images/top_set_nor.png";
import top_set_sel from "../../images/top_set_sel.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const [settings, setSettings] = useState(top_set_nor);
  const [toggle, setToggle] = useState("SETTINGS");
  const navigate = useNavigate();
  const handleClickOptions = () => {
    switch (toggle) {
      case "HOME":
        setSettings(top_set_nor);
        setToggle("SETTINGS");
        navigate("/");
        break;
      case "SETTINGS":
        setSettings(top_set_sel);
        setToggle("HOME");
        navigate("/settings");
        break;

      default:
        break;
    }
  };

  return (
    <div className="Header">
      <div className="Header__wrapper">
        <div className="Header__title">
          <span>NNPC</span>
        </div>
        <div className="Header__options">
          <img src={settings} alt="" onClick={handleClickOptions} />
        </div>
      </div>
    </div>
  );
}

export default Header;
