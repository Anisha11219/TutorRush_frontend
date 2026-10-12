import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';

function ProtectedRoute({ allowedRoles = [] }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // Show nothing while authentication status is being checked.
  if (!auth || auth.loading) {
    return (
      <div className="protected-route-loading">
        <p>Checking your login status...</p>
      </div>
    );
  }

  // Send users who are not logged in to the login page.
  if (!auth.user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Restrict access according to the user's role.
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(auth.user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;