import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;