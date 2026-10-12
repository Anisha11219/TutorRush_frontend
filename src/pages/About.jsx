import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Heart,
  BookOpen,
  Users,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

import MainLayout from '../layouts/MainLayout.jsx';

function About() {
  return (
    <MainLayout>
      <section className="about-hero">
        <div className="container about-hero-content">
          <span className="section-label">ABOUT TUTORRUSH</span>

          <h1>
            Making learning
            <span> personal and accessible.</span>
          </h1>

          <p>
            TutorRush is an instant topic-based learning platform
            designed to help students connect with tutors for
            focused, personalized learning.
          </p>
        </div>
      </section>

      <section className="section about-mission-section">
        <div className="container about-mission-grid">
          <div className="about-mission-content">
            <span className="section-label">OUR PURPOSE</span>

            <h2 className="section-title">
              Learn what you need, when you need it.
            </h2>

            <p>
              Sometimes students need help understanding just one
              topic rather than enrolling in an entire course.
              TutorRush aims to make finding that help easier.
            </p>

            <p>
              Students can describe their learning requirements,
              explore relevant tutor profiles, and choose a tutor
              according to their preferences.
            </p>
          </div>

          <div className="about-purpose-cards">
            <div className="about-purpose-card">
              <div className="about-icon purple-bg">
                <Target size={27} />
              </div>
              <h3>Our Mission</h3>
              <p>
                Make topic-specific learning support easier to find
                and more convenient for students.
              </p>
            </div>

            <div className="about-purpose-card">
              <div className="about-icon orange-bg">
                <Eye size={27} />
              </div>
              <h3>Our Vision</h3>
              <p>
                Build a learning platform where students can connect
                with suitable tutors for their individual needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-values-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">WHAT WE VALUE</span>

            <h2 className="section-title">
              Learning designed around you
            </h2>

            <p className="section-subtitle about-values-subtitle">
              Our platform is designed around flexibility,
              relevant learning support, and informed choices.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-icon purple-bg">
                <BookOpen size={27} />
              </div>
              <h3>Focused Learning</h3>
              <p>
                Concentrate on the specific subject or topic
                you want to understand.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-icon orange-bg">
                <Users size={27} />
              </div>
              <h3>Student Choice</h3>
              <p>
                Explore tutor profiles and choose according
                to your learning preferences.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-icon green-bg">
                <Heart size={27} />
              </div>
              <h3>Flexible Options</h3>
              <p>
                Consider suitable session timings, budgets,
                and available learning formats.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-icon blue-bg">
                <Lightbulb size={27} />
              </div>
              <h3>Personal Growth</h3>
              <p>
                Get an opportunity to work through difficult
                concepts with focused guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-cta-section">
        <div className="container">
          <div className="about-cta">
            <div className="about-cta-icon">
              <GraduationCap size={48} />
            </div>

            <h2>Ready to make learning easier?</h2>

            <p>
              Join TutorRush and take the next step in your
              learning journey.
            </p>

            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default About;
