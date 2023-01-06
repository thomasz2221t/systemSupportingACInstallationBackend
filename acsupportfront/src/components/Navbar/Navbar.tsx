import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/auth/AuthService';
import { UserRoles } from 'utils/UserRoles';
import CustomLinkFirst from './CustomLinkFirst';
import CustomLinkSingle from './CustomLinkSingle';

import './Navbar.scss';

export default function Navbar() {
  const logoImg = require('../../images/logoImg.png');
  const navigate = useNavigate();

  function handleLogoAction() {
    return navigate('/');
  }

  const handleSwitchingNavbarRegardingToUserRole = () => {
    if (AuthService.getCurrentUser()) {
      switch (AuthService.getCurrentUserRoles()[0]) {
        case UserRoles.CLIENT:
          return (
            <ul>
              <CustomLinkFirst linky={'/obiekty'}>
                Informacje o budynkach
              </CustomLinkFirst>
              <CustomLinkSingle linky={'/uslugi'}>
                Usługa i oferta
              </CustomLinkSingle>
              <CustomLinkSingle linky={'/szczegoly'}>
                Szczegóły zamówienia
              </CustomLinkSingle>
            </ul>
          );
          break;
        case UserRoles.OPERATOR:
          return (
            <ul>
              <CustomLinkFirst linky={'/operator/uslugi'}>
                Usługa i oferta
              </CustomLinkFirst>
            </ul>
          );
          break;
        case UserRoles.ADMIN:
          return (
            <ul>
              <CustomLinkFirst linky={'/admin/operator'}>
                Zarządzanie Operatorami
              </CustomLinkFirst>
            </ul>
          );
          break;
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="navbar-body">
        <div className="company-logo">
          <img
            src={logoImg}
            width="84"
            height="84"
            className="navbar-logo"
            onClick={handleLogoAction}
          />
        </div>
        <div className="navbar-elements">
          {handleSwitchingNavbarRegardingToUserRole()}
        </div>
      </div>
    </>
  );
}
