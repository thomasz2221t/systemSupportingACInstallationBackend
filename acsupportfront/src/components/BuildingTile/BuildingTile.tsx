import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BuildingTile.scss';

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
  const navigate = useNavigate();

  const handleBuildingClick = () => {
    if (id) {
      navigate(`obiekt/${id}`);
    }
  };

  return (
    <>
      <div className="building-tile" onClick={handleBuildingClick}>
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
