import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="about-wrapper py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-down">
            <h1 className="text-primary fw-bold display-4">About Staff-Sync-System</h1>
            <p className="lead text-muted">
              Connecting Talents with Opportunities Across the Globe
            </p>
            <hr className="w-25 mx-auto border-primary opacity-100 mt-3" />
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <img
                src="/images/photo-1519389950473-47ba0277781c.jpg"
                alt="About Staff Sync"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h3 className="text-secondary fw-bold mb-3">Who We Are</h3>
              <p className="text-muted fs-6">
                Staff-Sync-System is a modern job platform that connects job seekers with
                hiring companies through an intuitive, streamlined experience. Our tools empower both sides
                to find the right fit—faster.
              </p>
              <p className="text-muted fs-6">
                We're reshaping recruitment with speed, simplicity, and smarter matchmaking.
              </p>
              <a href="#!" className="btn btn-outline-primary mt-3">Learn More</a>
            </div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-person-check-fill text-primary display-4 mb-3"></i>
                  <h5 className="fw-semibold">For Job Seekers</h5>
                  <p className="text-muted">
                    Explore relevant job listings, manage your profile, and apply with ease.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-briefcase-fill text-success display-4 mb-3"></i>
                  <h5 className="fw-semibold">For Employers</h5>
                  <p className="text-muted">
                    Post openings, review applicants, and recruit qualified talent seamlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-lightbulb-fill text-warning display-4 mb-3"></i>
                  <h5 className="fw-semibold">Our Vision</h5>
                  <p className="text-muted">
                    To bridge opportunity and ambition through trusted digital recruitment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5" data-aos="fade-up">
            <h4 className="fw-bold">Join Staff-Sync-System Today</h4>
            <p className="text-muted">
              Whether hiring or being hired — we're here to help you grow.
            </p>
            <a href="/login" className="btn btn-primary btn-lg mt-2 px-4">Get Started</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;