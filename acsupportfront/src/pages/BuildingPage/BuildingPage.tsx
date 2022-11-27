import React from "react";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

/*export type BuildingsIdProp = {
  buildingId: number;
};*/

export function BuildingPage(/*{ buildingId }: BuildingsIdProp*/) {
  console.log("strona budynku");
  return (
    <>
      <p>Budynek: </p>
      <Navbar />
      <div className="building-page"></div>
      <Footer />
    </>
  );
}
