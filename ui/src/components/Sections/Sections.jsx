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
          <Section jetty="APAPA" coordinates={[6.454467, 3.37155]} />
          <Section jetty="ATLAS" coordinates={[6.4112, 3.3921]} />
          <Section jetty="CALABAR" coordinates={[8.320861, 4.984461]} />
          <Section jetty="OKRIKA" coordinates={[7.087561, 4.724506]} />
          <Section jetty="WARRI" coordinates={[5.69558, 5.53698]} />
          {/* <Section jetty="warri" coordinates={[5.69529, 5.53766]} /> */}
        </div>
      </div>
    </div>
  );
}

export default Sections;
