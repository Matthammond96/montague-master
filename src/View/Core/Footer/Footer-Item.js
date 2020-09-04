import React from 'react';
import { Link } from 'react-router-dom';

export const FooterGroup = props => {
  const { title, links } = props.group;
  return (
    <div className="footer-item">
      <p>{title}</p>
      {links.map(link => {
        const { title, url } = link.fields;
        return (
          <Link className="" to={url}>
            <p>{title}</p>
          </Link>
        )
      })}
    </div>
  )  
}