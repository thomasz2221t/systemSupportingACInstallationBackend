import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import BuildingTile from "components/BuildingTile/BuildingTile";
import UserAccount from "components/UserAccount/UserAccount";
import gettingUserRequest from "services/BuildingService";
import AuthService from "services/auth/AuthService";
import BuildingType from "types/BuildingType";

import "./BuildingsPage.scss";

const exampleBuilding = [
  {
    id: 0,
    name: "",
    imagePath: "",
    street: "",
    postCode: "",
    city: "",
    region: "",
    descirpiton: "",
  },
  {
    id: 1,
    name: "",
    imagePath: "",
    street: "",
    postCode: "",
    city: "",
    region: "",
    descirpiton: "",
  },
];

export function BuildingsPage() {
  const [userBuildings, setUserBuildings] =
    useState<BuildingType[]>(exampleBuilding);
  const [userId, setUserId] = useState<number>();

  const handleGetingUserBuildings = async (userId: number) => {
    await gettingUserRequest(userId).then((response) => {
      setUserBuildings(response.data);
    });
  };

  useEffect(() => {
    setUserId(AuthService.getCurrentUserId());
    handleGetingUserBuildings(1);
  });

  const handleBuildingTileMapping = () => {
    return userBuildings.map((building, id) => {
      return (
        <BuildingTile
          id={building.id}
          name={building.name}
          city={building.city}
          street={building.street}
        />
      );
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <UserAccount />
        <div className="buildings">{handleBuildingTileMapping()}</div>
        <Footer />
      </div>
    </>
  );
}
