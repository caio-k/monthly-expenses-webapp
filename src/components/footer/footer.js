import React from "react";
import "./footer.css";

function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <footer className="footer-site">
      <p>Copyright &copy; {actualYear}, Monthly Expenses</p>
    </footer>
  )
}

export default Footer;
