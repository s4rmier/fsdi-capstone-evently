import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="container flex-col">
        <div className="footer-body flex-row">
          <div className="column-1 flex-col">
            <div className="brand flex-row align">
              <img src="/logo.svg" alt="" />
              <h1>Evently</h1>
            </div>
            <p>Join our mailing list ofr the latest updates.</p>
            <div className="subscribe flex-row align">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-spec button">Subscribe</button>
            </div>
            <p>
              <small>
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </small>
            </p>
          </div>
          <div className="column-2 flex-col">
            <h3>About Us</h3>
            <ul className="flex-col">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Support</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="column-3 flex-col">
            <h3>Support</h3>
            <ul className="flex-col">
              <li>Help Center</li>
              <li>Community</li>
              <li>Resources</li>
              <li>Partners</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="column-4 flex-col">
            <h3>Follow Us</h3>
            <ul className="flex-col">
              <li>
                <i className="fa-brands fa-facebook-f"></i>Facebook
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>Instagram
              </li>
              <li>
                <i className="fa-brands fa-x-twitter"></i>Twitter
              </li>
              <li>
                <i className="fa-brands fa-linkedin-in"></i>LinkedIn
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>Youtube
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-closing flex-row align">
          <p className="copyright-footnote">
            <small>
              <i className="fa-regular fa-copyright"></i> 2023 Evently. All
              rights reserved.
            </small>
          </p>
          <ul className="footer-policy flex-row align">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Settings</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
