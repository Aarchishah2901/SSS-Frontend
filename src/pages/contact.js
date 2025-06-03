import React from 'react';

const Contact = () => {
  return (
    <>
      <div className="contact-wrapper py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="text-primary fw-bold">Contact Staff-Sync-System</h1>
            <p className="lead text-muted">
              We’re here to help! Reach out to us anytime.
            </p>
          </div>

          <div className="row gy-4">
            {/* Contact Info */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <h3 className="text-secondary fw-semibold mb-4">Get in Touch</h3>
                <p className="text-muted mb-3">
                  <strong>Address:</strong> 123 Sync Street, Tech City, USA
                </p>
                <p className="text-muted mb-3">
                  <strong>Phone:</strong> <a href="tel:+1234567890" className="text-decoration-none">+1 (234) 567-890</a>
                </p>
                <p className="text-muted mb-4">
                  <strong>Email:</strong> <a href="mailto:support@staff-sync.com" className="text-decoration-none">support@staff-sync.com</a>
                </p>

                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div>
                  <a
                    href="https://facebook.com/staffsync"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary me-3 fs-4"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/staffsync"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info me-3 fs-4"
                    aria-label="Twitter"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a
                    href="https://instagram.com/staffsync"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-danger fs-4"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-4 h-100">
                <h3 className="text-secondary fw-semibold mb-4">Send Us a Message</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your full name" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
                    <input type="text" className="form-control" id="subject" placeholder="Subject of your message" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">Message</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold" style={{ letterSpacing: '1px' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;