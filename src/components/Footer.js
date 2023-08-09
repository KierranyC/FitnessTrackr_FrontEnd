import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p>&copy;{currentYear} Fitness Tracker</p>
      <p>
        Developers:
        <a className="developers" target="_blank">
          Kierrany & Drew
        </a>
      </p>
    </div>
  );
};
export default Footer;





