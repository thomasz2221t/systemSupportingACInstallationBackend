import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { BuildingDetailsForm } from "components/Forms/BuildingDetails/BuildingDetailsForm";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import UserAccount from "components/UserAccount/UserAccount";

import "./BuildingPage.scss";
import { useNavigate, useParams } from "react-router-dom";

/*export type BuildingsIdProp = {
  buildingId: number;
};*/

export function BuildingPage(/*{ buildingId }: BuildingsIdProp*/) {
  const [buildingId, setBuildingId] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    setBuildingId(Number(id));
  }, [id]);

  const handleRoomButtonClick = () => {
    navigate(`pomieszczenia`);
  };

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="building-details">
        <BuildingDetailsForm
          id={buildingId}
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
          onClick={handleRoomButtonClick}
        >
          Zarządzaj pomieszczeniami
        </Button>
      </div>
      <Footer />
    </>
  );
}
