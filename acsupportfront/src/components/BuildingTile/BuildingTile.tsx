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
  return (
    <>
      <div className="building-tile">
        <text>{name}</text>
        <div>
          <text>{city}</text>
          <text>{street}</text>
        </div>
      </div>
    </>
  );
}
