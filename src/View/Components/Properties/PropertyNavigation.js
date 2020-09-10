import React, { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

export const PropertyNavigation = props => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const components = props.components;
  let navHeight = document.getElementById("navigation-contianer").clientHeight;
  const handleScroll = () => {
    if (ref.current) {
      navHeight = document.getElementById("navigation-contianer").clientHeight;
      setSticky(ref.current.getBoundingClientRect().top <= navHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <div className="property-navigation" ref={ref}>  
      <div className={`property-tabs${isSticky ? ' sticky' : ''}`}>
        <div id="tabbed-scrolled" className="tabs-container">
          {components.map(component => {
            let linkTo = "";
            let title = "";

            if (component.fields.title) {
              linkTo = "#" + component.fields.title.replace(" ", "-");
              title = component.fields.title;
                    }

            if (component.fields.tite) {
              linkTo = "#" + component.fields.tite.replace(" ", "-");
              title = component.fields.tite;
                    }

            const scrollWithOffset = (el) => {
              const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
              const yOffset = -180; 
              window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
            }

            return (
              <div className="tab-link active">
                <HashLink to={linkTo} scroll={el => scrollWithOffset(el)}><p>{title}</p></HashLink>
              </div>
            )
          })}
                
          <a href="/contact-us" className="btn property-btn">Schedule Viewing</a>
        </div>
      </div>
    </div>
  );
};