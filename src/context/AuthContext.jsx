import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ROLES } from '../constants/schema.js';

// DEMO ONLY: the signed-in user is kept in localStorage and no password is
// checked. Replace login/logout with real API calls once the backend exists.
const STORAGE_KEY = 'tutorrush_demo_user';

const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {}
});

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const user = raw ? JSON.parse(raw) : null;

    return user && Object.values(ROLES).includes(user.role) ? user : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(({ name, email, role }) => {
    const nextUser = {
      name: name?.trim() || email.split('@')[0],
      email: email.trim(),
      role
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);

    return nextUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading: false, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export const ROLE_HOME = {
  [ROLES.STUDENT]: '/student/dashboard',
  [ROLES.TUTOR]: '/tutor/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard'
};

export default AuthContext;
