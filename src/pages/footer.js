import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section text-white bg-dark mt-5">
      <div className="container py-5">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3">Staff Sync System</h4>
            <p>We help job seekers and employers connect effortlessly. Join us and take the next step in your career journey.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-1">📍 Shilp Corporate Park, B - 1009 to 1014</p>
            <p className="mb-1">Behind Rajpath Rangoli Road</p>
            <p className="mb-1">Bodakdev, Ahmedabad, Gujarat 380054</p>
            <p className="mb-1">📞 +91 98765 43210</p>
            <p>✉️ support@staffsync.com</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Find Us</h5>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.317968198015!2d72.504246114887!3d23.084397784918756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b3fc10f9ac9%3A0x40612a51b95cb9a3!2sShilp%20Corporate%20Park%2C%20B%20-%201009%20to%201014%2C%20behind%20Rajpath%20Rangoli%20Road%2C%20Bodakdev%2C%20Ahmedabad%2C%20Gujarat%20380054!5e0!3m2!1sen!2sin!4v1716993594964!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '5px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <hr className="border-light" />
        <div className="text-center small pt-3">
          &copy; {new Date().getFullYear()} Staff Sync System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;