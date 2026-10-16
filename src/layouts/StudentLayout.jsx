import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  UserRound,
  Search,
  CalendarDays,
  Star,
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/student/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Find Tutors',
      path: '/student/tutors',
      icon: Search
    },
    {
      label: 'My Profile',
      path: '/student/profile',
      icon: UserRound
    },
    {
      label: 'My Bookings',
      path: '/student/bookings',
      icon: CalendarDays
    },
    {
      label: 'My Reviews',
      path: '/student/reviews',
      icon: Star
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="student-layout">
      {sidebarOpen && (
        <div
          className="student-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`student-sidebar ${
          sidebarOpen ? 'student-sidebar-open' : ''
        }`}
      >
        <Link to="/" className="student-brand" onClick={closeSidebar}>
          <span className="student-brand-icon">
            <GraduationCap size={27} />
          </span>
          <span>
            Tutor<span>Rush</span>
          </span>
        </Link>

        <div className="student-sidebar-label">STUDENT MENU</div>

        <nav className="student-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `student-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeSidebar}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="student-sidebar-bottom">
          <Link to="/" className="student-nav-link" onClick={closeSidebar}>
            <Home size={20} />
            <span>Visit Website</span>
          </Link>

          <button
            type="button"
            className="student-nav-link student-logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="student-main">
        <header className="student-topbar">
          <button
            type="button"
            className="student-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div className="student-topbar-title">
            <span>Student Portal</span>
            <p>Welcome to your learning space</p>
          </div>

          <div className="student-topbar-avatar" title="Student">
            <UserRound size={22} />
          </div>
        </header>

        <main className="student-page-content">
          {children}
        </main>

        <footer className="student-dashboard-footer">
          © {new Date().getFullYear()} TutorRush
        </footer>
      </div>
    </div>
  );
}

export default StudentLayout;
