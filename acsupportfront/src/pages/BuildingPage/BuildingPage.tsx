import React from "react";
import { Button } from "@mui/material";

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
        <Button
          style={{
            position: "relative",
            marginTop: 32,
            left: -82,
            width: 1064,
            height: 53,
            backgroundColor: "#D6E900",
            color: "#ffffff",
            borderRadius: 18,
            padding: "18px 36px",
            fontSize: "18px",
            fontFamily: "Segoe UI",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: 24,
          }}
          variant="contained"
        >
          Zarządzaj pomieszczeniami
        </Button>
      </div>
      <Footer />
    </>
  );
}
