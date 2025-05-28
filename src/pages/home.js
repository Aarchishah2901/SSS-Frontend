import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">

      {/* Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <h1 className="mb-4">Staff Sync System</h1>
          <h1 className="mb-4">Find Your Dream Job Today</h1>
          <p className="mb-4">Staff-Sync-System connects job seekers and employers with ease.</p>
          <Link to="/register" className="btn btn-warning btn-lg me-3">Get Started</Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
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
      <section className="cta-section text-center">
        <div className="container">
          <h2>Ready to take the next step?</h2>
          <p>Join thousands of professionals and land your dream job.</p>
          <Link to="/register" className="btn btn-light btn-lg mt-3 fw-bold px-5">Register Now</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;