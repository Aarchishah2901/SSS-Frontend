import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import { Carousel as BootstrapCarousel } from 'bootstrap';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const API_URL = "http://localhost:5000/api";
  const userId = Cookies.get('userId');
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/job-requirements`)
      .then((res) => res.json())
      // .then((data) => setJobs(data))
      .then((data) => {
      console.log("Fetched jobs:", data);
      if (Array.isArray(data)) {
      setJobs(data);
      } else {
      setJobs([]); // fallback to empty array
    }
  })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    const carousel = new BootstrapCarousel(carouselElement, {
      interval: 3000,
      ride: 'carousel',
      pause: 'hover',
    });

    return () => carousel.dispose();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div id="heroCarousel" className="carousel slide" ref={carouselRef}>
        <div className="carousel-inner">
          {[{
            img: '/images/job-search.jpg',
            title: 'Staff Sync System',
            subtitle: 'Find Your Dream Job Today',
            text: 'Staff-Sync-System connects job seekers and employers with ease.',
          },
          {
            img: '/images/teamwork.jpg',
            title: 'Build Your Dream Team',
            subtitle: 'Find Skilled Professionals',
            text: 'Connecting companies with top-notch candidates.',
          },
          {
            img: '/images/interview.jpg',
            title: 'Start Your Career',
            subtitle: 'Your Dream Job Awaits',
            text: 'Sign up today and get hired.',
          }].map((item, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={item.img} className="d-block w-100 carousel-img" alt={item.title} />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-center h-100">
                <h1 className="mb-3">{item.title}</h1>
                <h2 className="mb-3">{item.subtitle}</h2>
                <p className="mb-4">{item.text}</p>
                <div>
                  {userId ? (
                    <Link to="/dashboard" className="btn btn-success btn-lg">Go to Dashboard</Link>
                  ) : (
                    <>
                      {/* <Link to="/register" className="btn btn-warning btn-lg me-3">Get Started</Link> */}
                      {/* <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose Us?</h2>
          <div className="row text-center g-4">
            {[
              { icon: "briefcase-fill", title: "Verified Listings", desc: "All job postings are thoroughly verified by our team." },
              { icon: "person-circle", title: "Top Employers", desc: "Work with reputed companies actively hiring now." },
              { icon: "speedometer2", title: "Fast Applications", desc: "Apply with one click, no long forms or red tape." },
            ].map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 p-4 shadow-sm">
                  <i className={`bi bi-${feature.icon} display-4 text-primary`}></i>
                  <h5 className="mt-3">{feature.title}</h5>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Explore Job Categories</h3>
          <div className="row text-center">
            {['IT & Software', 'Finance', 'Marketing', 'Human Resources', 'Engineering', 'Customer Support'].map((category, idx) => (
              <div className="col-6 col-md-4 mb-3" key={idx}>
                <div className="category-box py-3 px-2 shadow-sm">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="jobs-section py-5 bg-light">
        <div className="container">
          <h3 className="text-center fw-bold mb-5">Latest Job Openings</h3>
          <div className="row g-4">
            {jobs.length === 0 ? (
              <div className="col-12">
                <p className="text-center text-muted fs-5">No job postings available right now.</p>
              </div>
            ) : (
              jobs.slice(0, 5).map((job, idx) => (
                <div className="col-md-6 col-lg-4" key={job.id || idx}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-primary">{job.title}</h5>
                      <ul className="list-unstyled small text-muted mb-3">
                        <li><strong>Description:</strong> {job.description?.slice(0, 100)}...</li>
                        <li><strong>Experience:</strong> {job.required_experience}</li>
                        <li><strong>Qualification:</strong> {job.qualification}</li>
                        <li><strong>Work Type:</strong> {job.work_type}</li>
                      </ul>
                      <div className="mt-auto">
                        <Link to={userId ? "/dashboard" : "/login"} className="btn btn-outline-primary w-100">
                          {userId ? "View Job" : "Apply Now"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;