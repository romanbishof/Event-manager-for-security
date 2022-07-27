import React from "react";
import Section from "./Section/Section";
import "./Sections.css";

// Component that shows the avaible Jetty for solection

function Sections() {
  return (
    <div className="Sections">
      <div className="Sections__header header span">
        <span>Section</span>
      </div>
      <div className="Section__body">
        <div className="Section__body-wrapper">
          <Section
            jetty="APAPA"
            sectionId={20}
            coordinates={[6.455443, 3.371531]}
            select={true}
          />
          <Section
            jetty="ATLAS"
            sectionId={21}
            coordinates={[6.4112, 3.3921]}
            select={true}
          />
          <Section
            jetty="CALABAR"
            sectionId={22}
            coordinates={[8.322446, 4.984032]}
            select={true}
          />
          <Section
            jetty="OKRIKA"
            sectionId={25}
            coordinates={[7.086445, 4.721889]}
            select={true}
          />
          <Section
            jetty="WARRI"
            sectionId={23}
            coordinates={[5.695483, 5.537667]}
            select={true}
          />
          {/* <Section jetty="warri" coordinates={[5.69529, 5.53766]} /> */}
        </div>
      </div>
    </div>
  );
}

export default Sections;
