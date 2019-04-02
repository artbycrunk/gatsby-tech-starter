import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
const Link = ({ children, to, className, activeClassName, ...other }) => {
    // Tailor the following test to your environment.
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    const internal = /^\/(?!\/)/.test(to);
    const file = /.mel$/.test(to);

    const isPartiallyActive = ({ isPartiallyCurrent }) =>
        isPartiallyCurrent ? { className: `${className} ${activeClassName}` } : { className: `${className}` };

    // Use Gatsby Link for internal links, and <a> for others
    if (internal && !file) {
        // console.log(`Link internal : ${to} : ${className}`);
        if (activeClassName) {
            return (
              <GatsbyLink to={to} getProps={isPartiallyActive} {...other}>
                {children}
              </GatsbyLink>
            );
        }
        return (
          <GatsbyLink to={to} className={className} {...other}>
            {children}
          </GatsbyLink>
        );

    }
    // console.log(`Link external : ${to} : ${className}`);
    return (
      <a href={to} className={className} {...other}>
        {children}
      </a>
    );
};

export default Link;
