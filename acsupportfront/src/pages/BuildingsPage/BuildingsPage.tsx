import React from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import BuildingTile from "components/BuildingTile/BuildingTile";

import "./BuildingsPage.scss";

export function BuildingsPage() {
  return (
    <>
      <div>
        <Navbar />
        <div className="buildings">
          <BuildingTile id={0} name={""} city={""} street={""} />
          <BuildingTile id={0} name={""} city={""} street={""} />
          <BuildingTile id={0} name={""} city={""} street={""} />
        </div>
        <Footer />
      </div>
    </>
  );
}
