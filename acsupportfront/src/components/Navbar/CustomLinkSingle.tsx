import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function CustomLinkSingle({ linky, children, ...props }: any) {
  const resolvedPath = useResolvedPath(linky);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      className={
        isActive ? 'navbar-element-single active' : 'navbar-element-single'
      }
    >
      <Link className="" to={linky}>
        {children}
      </Link>
    </li>
  );
}
