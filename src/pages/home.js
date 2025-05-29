import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const Home = () => {
  // const handleImgError = (e) => {
  //   e.target.src = "https://via.placeholder.com/1200x500?text=Image+Not+Found";
  // };

  return (
    <div className="home-page">

      {/* Hero Banner */}
      <section className="hero-section">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/job-search.jpg" className="d-block w-100 carousel-img" alt="Job Search" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center h-100">
              <h1 className="mb-3">Staff Sync System</h1>
              <h2 className="mb-3">Find Your Dream Job Today</h2>
              <p className="mb-4">Staff-Sync-System connects job seekers and employers with ease.</p>
              <div>
                <Link to="/register" className="btn btn-warning btn-lg me-3">Get Started</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/images/teamwork.jpg" className="d-block w-100 carousel-img" alt="Teamwork" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center h-100">
              <h1 className="mb-3">Build Your Dream Team</h1>
              <h2 className="mb-3">Find Skilled Professionals</h2>
              <p className="mb-4">Connecting companies with top-notch candidates.</p>
              <div>
                <Link to="/register" className="btn btn-warning btn-lg me-3">Hire Now</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/images/interview.jpg" className="d-block w-100 carousel-img" alt="Interview" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center h-100">
              <h1 className="mb-3">Start Your Career</h1>
              <h2 className="mb-3">Your Dream Job Awaits</h2>
              <p className="mb-4">Sign up today and get hired.</p>
              <div>
                <Link to="/register" className="btn btn-warning btn-lg me-3">Apply Now</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>

      {/* Features */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose Us?</h2>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 shadow-sm">
                <i className="bi bi-briefcase-fill display-4 text-primary"></i>
                <h5 className="mt-3">Verified Listings</h5>
                <p>All job postings are thoroughly verified by our team.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 shadow-sm">
                <i className="bi bi-person-circle display-4 text-success"></i>
                <h5 className="mt-3">Top Employers</h5>
                <p>Work with reputed companies actively hiring now.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 shadow-sm">
                <i className="bi bi-speedometer2 display-4 text-danger"></i>
                <h5 className="mt-3">Fast Applications</h5>
                <p>Apply with one click, no long forms or red tape.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Explore Job Categories</h3>
          <div className="row text-center">
            {['IT & Software', 'Finance', 'Marketing', 'Human Resources', 'Engineering', 'Customer Support' ].map((category, idx) => (
              <div className="col-6 col-md-4 mb-3" key={idx}>
                <div className="category-box py-3 px-2 shadow-sm">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="jobs-section py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Latest Job Openings</h3>
          <div className="row g-4">
            {[1, 2, 3].map((job, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 p-3">
                  <h5>Frontend Developer</h5>
                  <p className="text-muted">ABC Tech Pvt Ltd • Bangalore</p>
                  <p>Looking for a skilled React developer with 2+ years of experience.</p>
                  <Link to="/login" className="btn btn-primary mt-auto">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="footer-section text-white">
      <div className="container py-5">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3">Staff Sync System</h4>
            <p>
              We help job seekers and employers connect effortlessly. Join us
              and take the next step in your career journey.
            </p>
            {/* <Link to="/register" className="btn btn-warning mt-3 fw-bold">
              Register Now
            </Link> */}
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
              style={{ border: 0, borderRadius: "5px" }}
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

    </div>
  );
};

export default Home;