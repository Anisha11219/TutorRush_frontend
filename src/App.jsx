
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
