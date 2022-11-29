import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

import { RoomDetailsForm } from "components/Forms/RoomDetailsForm.scss/RoomDetailsForm";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import UserAccount from "components/UserAccount/UserAccount";

import "./RoomPage.scss";

export function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(`/obiekty/obiekt/${Number(id)}`);
  };

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="return-link-wrapper">
        <Icon
          className="return-icon"
          icon="mdi:close-circle-outline"
          color="#4e4e4e"
          height="21"
        />
        <Button
          sx={{
            color: "#ffffff",
          }}
          onClick={handleReturnButtonClick}
        >
          Powrót
        </Button>
      </div>
      <div className="room-details">
        <RoomDetailsForm
          id={0}
          name={""}
          purpose={""}
          areaX={0}
          areaY={0}
          height={0}
          powerGiveOut={0}
          numberOfPeople={0}
          additionalInfo={""}
        />
      </div>
      <div className="room-details">
        <RoomDetailsForm
          id={0}
          name={""}
          purpose={""}
          areaX={0}
          areaY={0}
          height={0}
          powerGiveOut={0}
          numberOfPeople={0}
          additionalInfo={""}
        />
      </div>
      <Footer />
    </>
  );
}
