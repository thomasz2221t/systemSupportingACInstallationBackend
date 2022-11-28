import React from "react";

import { BuildingDetailsForm } from "components/Forms/BuildingDetails/BuildingDetailsForm";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import UserAccount from "components/UserAccount/UserAccount";

import "./BuildingPage.scss";

/*export type BuildingsIdProp = {
  buildingId: number;
};*/

export function BuildingPage(/*{ buildingId }: BuildingsIdProp*/) {
  console.log("strona budynku");
  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="building-details">
        <BuildingDetailsForm
          id={1}
          name={""}
          type={""}
          street={""}
          postCode={""}
          city={""}
          region={""}
          additionalInfo={""}
        />
      </div>
      <Footer />
    </>
  );
}
