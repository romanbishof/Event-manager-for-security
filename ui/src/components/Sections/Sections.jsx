import React from "react";
import Section from "./Section/Section";
import "./Sections.css";

function Sections() {
  return (
    <div className="Sections">
      <div className="Sections__header header">
        <span>Section</span>
      </div>
      <div className="Section__body">
        <div className="Section__body-wrapper">
          <Section jetty="apapa" coordinates={[6.454467, 3.37155]} />
          <Section jetty="atlas" coordinates={[6.4112, 3.3921]} />
          <Section jetty="calabar" coordinates={[8.320861, 4.984461]} />
          <Section jetty="okrika" coordinates={[7.087561, 4.724506]} />
          <Section jetty="warri" coordinates={[5.53698, 5.69558]} />
        </div>
      </div>
    </div>
  );
}

export default Sections;
