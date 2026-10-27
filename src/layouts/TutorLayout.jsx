import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  UserRound,
  FileCheck,
  CalendarClock,
  IndianRupee,
  ClipboardList,
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';

function TutorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/tutor/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'My Profile',
      path: '/tutor/profile',
      icon: UserRound
    },
    {
      label: 'Qualifications',
      path: '/tutor/qualifications',
      icon: FileCheck
    },
    {
      label: 'Availability',
      path: '/tutor/availability',
      icon: CalendarClock
    },
    {
      label: 'My Pricing',
      path: '/tutor/pricing',
      icon: IndianRupee
    },
    {
      label: 'Booking Requests',
      path: '/tutor/bookings',
      icon: ClipboardList
    }
  ];

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="tutor-layout">
      {sidebarOpen && (
        <div
          className="tutor-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`tutor-sidebar ${
          sidebarOpen ? 'tutor-sidebar-open' : ''
        }`}
      >
        <Link to="/" className="tutor-brand" onClick={closeSidebar}>
          <span className="tutor-brand-icon">
            <GraduationCap size={27} />
          </span>
          <span>
            Tutor<span>Rush</span>
          </span>
        </Link>

        <div className="tutor-sidebar-label">TUTOR MENU</div>

        <nav className="tutor-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `tutor-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeSidebar}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="tutor-sidebar-bottom">
          <Link
            to="/"
            className="tutor-nav-link"
            onClick={closeSidebar}
          >
            <Home size={20} />
            <span>Visit Website</span>
          </Link>

          <button
            type="button"
            className="tutor-nav-link tutor-logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="tutor-main">
        <header className="tutor-topbar">
          <button
            type="button"
            className="tutor-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div className="tutor-topbar-title">
            <span>Tutor Portal</span>
            <p>Manage your teaching activities</p>
          </div>

          <div className="tutor-topbar-avatar" title="Tutor">
            <GraduationCap size={22} />
          </div>
        </header>

        <main className="tutor-page-content">
          {children}
        </main>

        <footer className="tutor-dashboard-footer">
          © {new Date().getFullYear()} TutorRush
        </footer>
      </div>
    </div>
  );
}

export default TutorLayout;