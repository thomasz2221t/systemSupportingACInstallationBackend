import React from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import BuildingTile from "components/BuildingTile/BuildingTile";
import UserAccount from "components/UserAccount/UserAccount";

import "./BuildingsPage.scss";

export function BuildingsPage() {
  return (
    <>
      <div>
        <Navbar />
        <UserAccount />
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
