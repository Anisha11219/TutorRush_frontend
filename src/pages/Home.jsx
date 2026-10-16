import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Video,
  MapPin,
  Star
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout.jsx';
import '../styles/hero-fix.css';

const heroTopics = ['Mathematics', 'Programming', 'Science'];

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const goToSearch = (text) => {
    const term = text.trim();
    navigate(term ? `/student/tutors?q=${encodeURIComponent(term)}` : '/student/tutors');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    goToSearch(query);
  };

  return (
    <MainLayout>
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <GraduationCap size={18} />
              Your learning, your way
            </span>

            <h1>
              Stuck on a topic?
              <br />
              <span>Find your tutor.</span>
            </h1>

            <p className="hero-description">
              TutorRush connects you with tutors who can help you
              understand exactly what you need, right when you need it.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Find a Tutor <ArrowRight size={18} />
              </Link>

              <Link to="/register" className="btn btn-outline">
                Become a Tutor
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-icon">
                <CheckCircle size={19} />
              </div>
              <p>Learn at your pace, one topic at a time.</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card main-hero-card">
              <div className="hero-card-top">
                <div className="hero-card-icon">
                  <BookOpen size={25} />
                </div>
                <span className="online-status">Start learning</span>
              </div>

              <h3>What do you want to learn today?</h3>
              <p>Find help with the topic you're struggling with.</p>

              <form className="hero-search-form" onSubmit={handleSearch} role="search">
                <Search size={19} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a subject or topic"
                  aria-label="Search a subject or topic"
                />
              </form>

              <div className="hero-topic-list">
                {heroTopics.map((topic) => (
                  <button type="button" key={topic} onClick={() => goToSearch(topic)}>
                    {topic}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="hero-card-button"
                onClick={() => goToSearch(query)}
              >
                Explore Tutors <ArrowRight size={17} />
              </button>
            </div>

            <div className="floating-card floating-card-top">
              <div className="floating-icon purple">
                <Video size={21} />
              </div>
              <div>
                <strong>Online Learning</strong>
                <p>Learn from anywhere</p>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <div className="floating-icon orange">
                <MapPin size={21} />
              </div>
              <div>
                <strong>Flexible Learning</strong>
                <p>Online or in person</p>
              </div>
            </div>

            <div className="hero-decoration hero-decoration-one"></div>
            <div className="hero-decoration hero-decoration-two"></div>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">WHY TUTORRUSH?</span>
            <h2 className="section-title">
              Learning made simple
            </h2>
            <p className="section-subtitle features-subtitle">
              Get focused help with the exact topic you need to understand.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-purple">
                <Search size={27} />
              </div>
              <h3>Topic-Based Search</h3>
              <p>
                Tell us the subject and topic you need help with to
                discover relevant tutors.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-orange">
                <Users size={27} />
              </div>
              <h3>Choose Your Tutor</h3>
              <p>
                Explore tutor profiles and select someone who matches
                your learning needs.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-green">
                <Clock size={27} />
              </div>
              <h3>Flexible Sessions</h3>
              <p>
                Choose a suitable time and learning format based on
                your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">HOW IT WORKS</span>
            <h2 className="section-title">
              Three steps to better learning
            </h2>
            <p className="section-subtitle steps-subtitle">
              Getting help with a difficult topic can be simple.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <BookOpen size={28} />
              </div>
              <h3>Share Your Topic</h3>
              <p>
                Enter the subject, topic, difficulty level and
                preferred learning time.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <Users size={28} />
              </div>
              <h3>Find Your Tutor</h3>
              <p>
                Explore relevant tutor profiles and compare
                their expertise and availability.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <GraduationCap size={28} />
              </div>
              <h3>Start Learning</h3>
              <p>
                Arrange a session with your chosen tutor and
                work towards understanding the topic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tutor-cta-section">
        <div className="container">
          <div className="tutor-cta">
            <div className="cta-content">
              <span className="cta-label">FOR TUTORS</span>
              <h2>Share your knowledge. Make a difference.</h2>
              <p>
                Help students understand difficult topics by
                sharing your skills and subject knowledge.
              </p>

              <Link to="/register" className="btn cta-button">
                Join as a Tutor <ArrowRight size={18} />
              </Link>
            </div>

            <div className="cta-illustration">
              <div className="cta-circle">
                <GraduationCap size={90} />
              </div>
              <div className="cta-star cta-star-one">
                <Star size={25} />
              </div>
              <div className="cta-star cta-star-two">
                <Star size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Home;
