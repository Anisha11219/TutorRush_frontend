import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  UserCheck,
  Menu,
  X,
  LogOut,
  Home,
  ShieldCheck
} from 'lucide-react';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Tutor Verification',
      path: '/admin/verification',
      icon: UserCheck
    }
  ];

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? 'admin-sidebar-open' : ''
        }`}
      >
        <Link to="/" className="admin-brand" onClick={closeSidebar}>
          <span className="admin-brand-icon">
            <GraduationCap size={27} />
          </span>
          <span>
            Tutor<span>Rush</span>
          </span>
        </Link>

        <div className="admin-panel-label">
          <ShieldCheck size={15} />
          ADMIN PANEL
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeSidebar}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link
            to="/"
            className="admin-nav-link"
            onClick={closeSidebar}
          >
            <Home size={20} />
            <span>Visit Website</span>
          </Link>

          <button
            type="button"
            className="admin-nav-link admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div className="admin-topbar-title">
            <span>Administration</span>
            <p>Manage TutorRush platform activities</p>
          </div>

          <div className="admin-topbar-badge">
            <ShieldCheck size={17} />
            <span>Administrator</span>
          </div>
        </header>

        <main className="admin-page-content">
          {children}
        </main>

        <footer className="admin-dashboard-footer">
          © {new Date().getFullYear()} TutorRush Admin Panel
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;