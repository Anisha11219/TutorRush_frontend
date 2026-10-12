import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout.jsx';

function NotFound() {
  return (
    <MainLayout>
      <section className="section">
        <div className="container text-center">
          <span className="section-label">ERROR 404</span>
          <h1 className="section-title">Page not found</h1>
          <p className="section-subtitle">
            The page you are looking for does not exist.
          </p>

          <Link to="/" className="btn btn-primary">
            Back to Home <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default NotFound;
