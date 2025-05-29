import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from './components/Navbar';
import JobList from './pages/job_list';
import JobApplicationForm from './pages/job_application';
import JobRequirementForm from './pages/job_requirement';
import Notification from './pages/notification';

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
                <Route path="/notifications" element={<Notification />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        <ToastContainer />
    </Router>
    );
}

export default AppRoutes;