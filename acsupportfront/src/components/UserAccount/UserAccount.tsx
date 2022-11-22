import React from "react";
import { Link } from "react-router-dom";

export const userMenuItems = [
  {
    title: "Wyloguj się",
    url: "/logout",
  },
];

export default function UserAccount() {
  return (
    <>
      <div>
        <ul className="user-menu">
          {userMenuItems.map((menu, index) => {
            return (
              <li className="menu-items" key={index}>
                <Link to={menu.url}>{menu.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
