import React, { useState } from "react";

import "./BuildingTile.scss";

export type BuildingTileProps = {
  id: number;
  name: string;
  city: string;
  street: string;
};
export default function BuildingTile({
  id,
  name,
  city,
  street,
}: BuildingTileProps) {
  const exampleBuilding = require("../../images/exampleBuilding.jpg");

  return (
    <>
      <div className="building-tile">
        <img
          src={exampleBuilding}
          width="184"
          height="115"
          className="building-img"
        />
        <div className="building-name">
          <text className="actual-name">{name}</text>
        </div>
        <div className="building-address">
          <text className="building-city-street">{city}</text>
          <text className="building-city-street">{street}</text>
        </div>
      </div>
    </>
  );
}
