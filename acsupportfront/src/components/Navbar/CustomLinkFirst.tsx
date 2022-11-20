import React from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

export default function CustomLinkFirst({ linky, children, ...props }: any) {
  const resolvedPath = useResolvedPath(linky);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      className={
        isActive ? "navbar-element-first active" : "navbar-element-first"
      }
    >
      <Link to={linky}>{children}</Link>
    </li>
  );
}
