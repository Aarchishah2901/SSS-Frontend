import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from './pages/navbar';
import Footer from './pages/footer';
import JobList from './pages/job_list';
import JobApplicationForm from './pages/job_application';
import JobRequirementForm from './pages/job_requirement';
import Notification from './pages/notification';
import JobRequests from './pages/job_Request';
import AboutUs from './pages/about us';
import Contact from './pages/contact';
import SelectionStatus from './pages/review_status';
import FillUserDetails from './pages/filluser_detail';
import UserDetails from './pages/user_details';
// import PrivateRoute from './components/protectedroute';

function AppRoutes() {
return (
    <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/job/post" element={<JobRequirementForm/>} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/apply/:jobId" element={<JobApplicationForm />} />
                {/* <Route path="/apply/:jobId" element={<PrivateRoute element={<JobApplicationForm />} />} /> */}
                <Route path="/notifications" element={<Notification />} />
                <Route path="/jobrequests" element={<JobRequests />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/review" element={<SelectionStatus/>} />
                <Route path="/fill-user-details" element={<FillUserDetails />} />
                <Route path="/user-details/:userId" element={<UserDetails />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        <Footer />
        <ToastContainer />
    </Router>
    );
}

export default AppRoutes;