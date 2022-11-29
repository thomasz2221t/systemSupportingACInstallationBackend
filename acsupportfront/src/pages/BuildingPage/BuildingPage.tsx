import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { BuildingDetailsForm } from "components/Forms/BuildingDetails/BuildingDetailsForm";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import UserAccount from "components/UserAccount/UserAccount";
import BuildingType from "types/BuildingType";
import BuildingService from "services/BuildingService";

import "./BuildingPage.scss";

const DEFAULT_BUILDING_OBJECT = {
  id: 0,
  name: "",
  imagePath: "",
  street: "",
  postCode: "",
  city: "",
  region: "",
  descirpiton: "",
};

export function BuildingPage() {
  const [buildingId, setBuildingId] = useState<number>(0);
  const [buildingBody, setBuildingBody] = useState<BuildingType>(
    DEFAULT_BUILDING_OBJECT
  );
  const { id } = useParams();
  const navigate = useNavigate();

  /*const handleFetchingBuildingsData = async (buildingId: number) => {
    const received = axios
      .get(`${API_URL}/building/${buildingId}`, authHeader())
      .then((response) => {
        setBuildingBody(response.data);
        console.log(response.data);
      });
    return received;
  };*/
  const handleGettingBuildingsData = async (buildingId: number) => {
    await BuildingService.getBuilding(buildingId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setBuildingBody(response.data.content);
    });
  };

  useEffect(() => {
    console.log(id);
    setBuildingId(Number(id));
  }, []); //[id]

  useEffect(() => {
    handleGettingBuildingsData(buildingId);
  }, [buildingId]);

  const handleRoomButtonClick = () => {
    navigate(`pomieszczenia`);
  };

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="building-details">
        <BuildingDetailsForm
          id={buildingBody.id}
          name={buildingBody.name}
          type={""}
          street={buildingBody.street}
          postCode={buildingBody.postCode}
          city={buildingBody.city}
          region={buildingBody.region}
          additionalInfo={buildingBody.descirpiton}
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
