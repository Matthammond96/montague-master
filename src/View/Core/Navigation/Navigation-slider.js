import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = props => {
  const {onClickHanlder, title, url, parent} = props;
  return (
    <div className="nav-item" onClick={onClickHanlder}>
      <Link className="" to={url}>
        <p>{title}{parent ? (
          // <span className="nav-item-arrow">></span>
          null
        ) : null }</p>
      </Link>
    </div>
  )
}