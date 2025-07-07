import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col brand">
          <h3>GIGO</h3>
          <p>© 2025 GIGO Inc.</p>
          <p>Connecting clients and freelancers worldwide.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>Find Talent</li>
            <li>Find Work</li>
            <li>Categories</li>
            <li>Success Stories</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>For Freelancers</h4>
          <ul>
            <li>How It Works</li>
            <li>Freelancer Resources</li>
            <li>Community</li>
            <li>Freelancer Support</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>For Clients</h4>
          <ul>
            <li>Post a Job</li>
            <li>Hire Experts</li>
            <li>Enterprise Solutions</li>
            <li>Client Support</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
            <li>Trust & Safety</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
