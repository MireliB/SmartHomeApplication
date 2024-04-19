import React from "react";

const footerContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  background: "#122b47",
  color: "#ffffff",
  textAlign: "center",
  padding: "40px 0",
};

const contactStyle = {
  marginBottom: 30,
};

const termsStyle = {
  marginBottom: 30,
  color: "lightgrey",
  textAlign: "center",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  marginBottom: 1,
};

const socialIconsStyle = {
  display: "flex",
  justifyContent: "center",
};

const iconStyle = {
  fontSize: 24,
  margin: "0 10px",
};

export default function Footer() {
  return (
    <footer style={footerContainerStyle}>
      <div style={contactStyle}>
        <h3>Contact Us</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <i className="fa fa-envelope" style={iconStyle}></i>{" "}
            mireloosh2@gmail.com
          </li>

          <li style={listItemStyle}>
            <i className="fa fa-map-marker" style={iconStyle}></i> Tel Aviv,
            Israel
          </li>
        </ul>
      </div>
      <div style={termsStyle}>
        <h3>Terms & Policies</h3>
        <nav>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <a href="privacy-policy.html">Privacy Policy</a>
            </li>
            <li style={listItemStyle}>
              <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
            </li>
            <li style={listItemStyle}>
              <a href="refund-policy.html">Refund Policy</a>
            </li>
            <li style={listItemStyle}>
              <a href="disclaimer-policy.html">Disclaimer Policy</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p>&copy; {new Date().getFullYear()} Mirel</p>
        <div style={socialIconsStyle}>
          <i className="fa fa-facebook-official" style={iconStyle}></i>
          <i className="fa fa-twitter-square" style={iconStyle}></i>
          <i className="fa fa-github-square" style={iconStyle}></i>
        </div>
      </div>
    </footer>
  );
}
