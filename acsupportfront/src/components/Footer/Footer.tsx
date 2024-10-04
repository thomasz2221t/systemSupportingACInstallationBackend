import React from "react";

import "./Footer.scss";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <text>Kontakt z nami:</text>
        <div>
          <text className="media">tel: 32 000 000 000</text>
          <text className="media">e-mail: obsluga.klienta@sai.pl</text>
        </div>
        <div>
          <text>© 2022 Silent Air Industries</text>
        </div>
      </div>
    </>
  );
}
