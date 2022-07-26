import React, { useState } from "react";
import "./TabBar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import dashBoard from "../../iconImage/tab_dashboard_sel.png";
import { useNavigate } from "react-router-dom";

function TabBar() {
  const [tab, setTab] = useState("DASHBOARD");
  const navigate = useNavigate();

  const handleSelectTab = (e) => {
    switch (e.target.innerText.toUpperCase()) {
      case "DASHBOARD":
        navigate("/");
        setTab("DASHBOARD");
        break;
      case "STATUS":
        navigate("/status");
        setTab("STATUS");
      default:
        break;
    }
  };
  return (
    <div className="TabBar">
      <ul className="TabBar__TabList" onClick={handleSelectTab}>
        <li className={tab === "DASHBOARD" ? "TabBar__active" : ""}>
          <DashboardIcon />
          <span>{`DashBoard`}</span>
        </li>
        <li className={tab === "STATUS" ? "TabBar__active" : ""}>
          <img src={dashBoard} alt="" />
          <span>{`Status`}</span>
        </li>
      </ul>
    </div>
  );
}

export default TabBar;
