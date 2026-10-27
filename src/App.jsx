import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import NotFound from './pages/NotFound.jsx';

import StudentDashboard from './pages/student/StudentDashboard.jsx';
import StudentProfile from './pages/student/StudentProfile.jsx';
import TutorSearch from './pages/student/TutorSearch.jsx';
import StudentTutorProfile from './pages/student/TutorProfile.jsx';
import CreateRequirement from './pages/student/CreateRequirement.jsx';
import BookingHistory from './pages/student/BookingHistory.jsx';
import Reviews from './pages/student/Reviews.jsx';

import TutorDashboard from './pages/tutor/TutorDashboard.jsx';
import TutorProfileForm from './pages/tutor/TutorProfileForm.jsx';
import Qualifications from './pages/tutor/Qualifications.jsx';
import Availability from './pages/tutor/Availability.jsx';
import Pricing from './pages/tutor/Pricing.jsx';
import BookingRequests from './pages/tutor/BookingRequests.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import TutorVerification from './pages/admin/TutorVerification.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/tutors" element={<TutorSearch />} />
        <Route path="/student/tutors/:id" element={<StudentTutorProfile />} />
        <Route path="/student/requirements/new" element={<CreateRequirement />} />
        <Route path="/student/bookings" element={<BookingHistory />} />
        <Route path="/student/reviews" element={<Reviews />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['TUTOR']} />}>
        <Route path="/tutor" element={<Navigate to="/tutor/dashboard" replace />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/profile" element={<TutorProfileForm />} />
        <Route path="/tutor/qualifications" element={<Qualifications />} />
        <Route path="/tutor/availability" element={<Availability />} />
        <Route path="/tutor/pricing" element={<Pricing />} />
        <Route path="/tutor/bookings" element={<BookingRequests />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/verification" element={<TutorVerification />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
