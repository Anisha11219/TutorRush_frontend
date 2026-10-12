import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Video,
  GraduationCap,
  IndianRupee,
  Clock,
  UserRound,
  X,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';

import StudentLayout from '../../layouts/StudentLayout.jsx';

const sampleTutors = [
  {
    id: 1,
    name: 'Rahul Sharma',
    subject: 'Mathematics',
    qualification: 'B.Tech in Computer Science',
    experience: '3 years of teaching',
    rating: 4.9,
    reviews: 42,
    price: 300,
    mode: ['Online', 'Offline'],
    location: 'Lucknow',
    bio: 'Helps students understand calculus, algebra, and other mathematical concepts through practical examples.',
    initials: 'RS',
    color: 'purple',
    verified: true,
  },
  {
    id: 2,
    name: 'Priya Verma',
    subject: 'Physics',
    qualification: 'M.Sc. in Physics',
    experience: '4 years of teaching',
    rating: 4.8,
    reviews: 36,
    price: 350,
    mode: ['Online'],
    location: 'Lucknow',
    bio: 'Focuses on building strong physics fundamentals and explaining difficult concepts step by step.',
    initials: 'PV',
    color: 'orange',
    verified: true,
  },
  {
    id: 3,
    name: 'Aman Singh',
    subject: 'Programming',
    qualification: 'B.Tech in Information Technology',
    experience: '2 years of teaching',
    rating: 4.7,
    reviews: 28,
    price: 400,
    mode: ['Online', 'Offline'],
    location: 'Lucknow',
    bio: 'Teaches programming fundamentals, Java, Python, and problem-solving techniques.',
    initials: 'AS',
    color: 'green',
    verified: true,
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    subject: 'Chemistry',
    qualification: 'M.Sc. in Chemistry',
    experience: '5 years of teaching',
    rating: 4.9,
    reviews: 51,
    price: 450,
    mode: ['Online', 'Offline'],
    location: 'Lucknow',
    bio: 'Makes organic and inorganic chemistry easier through examples and focused revision sessions.',
    initials: 'SG',
    color: 'pink',
    verified: true,
  },
  {
    id: 5,
    name: 'Vikram Yadav',
    subject: 'Computer Science',
    qualification: 'B.Tech in Computer Science',
    experience: '3 years of teaching',
    rating: 4.6,
    reviews: 24,
    price: 250,
    mode: ['Online'],
    location: 'Lucknow',
    bio: 'Helps students with data structures, algorithms, databases, and core computer science subjects.',
    initials: 'VY',
    color: 'blue',
    verified: false,
  },
  {
    id: 6,
    name: 'Neha Mishra',
    subject: 'English',
    qualification: 'M.A. in English',
    experience: '4 years of teaching',
    rating: 4.8,
    reviews: 39,
    price: 300,
    mode: ['Online', 'Offline'],
    location: 'Lucknow',
    bio: 'Supports students with grammar, writing, communication skills, and English literature.',
    initials: 'NM',
    color: 'teal',
    verified: true,
  },
];

function TutorSearch() {
  const [searchText, setSearchText] = useState('');
  const [subject, setSubject] = useState('All Subjects');
  const [classMode, setClassMode] = useState('Any Mode');
  const [minimumRating, setMinimumRating] = useState('0');
  const [maximumPrice, setMaximumPrice] = useState('1000');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutors = useMemo(() => {
    let results = sampleTutors.filter((tutor) => {
      const query = searchText.trim().toLowerCase();

      const matchesSearch =
        !query ||
        tutor.name.toLowerCase().includes(query) ||
        tutor.subject.toLowerCase().includes(query) ||
        tutor.qualification.toLowerCase().includes(query) ||
        tutor.bio.toLowerCase().includes(query);

      const matchesSubject =
        subject === 'All Subjects' || tutor.subject === subject;

      const matchesMode =
        classMode === 'Any Mode' || tutor.mode.includes(classMode);

      const matchesRating = tutor.rating >= Number(minimumRating);

      const matchesPrice = tutor.price <= Number(maximumPrice);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesMode &&
        matchesRating &&
        matchesPrice
      );
    });

    if (sortBy === 'price-low') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [
    searchText,
    subject,
    classMode,
    minimumRating,
    maximumPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchText('');
    setSubject('All Subjects');
    setClassMode('Any Mode');
    setMinimumRating('0');
    setMaximumPrice('1000');
    setSortBy('recommended');
  };

  return (
    <StudentLayout>
      <div className="tutor-search-page">
        <section className="tutor-search-hero">
          <div className="tutor-search-hero-content">
            <span className="tutor-search-eyebrow">
              YOUR LEARNING, YOUR WAY
            </span>

            <h1>Find the Right Tutor for You</h1>

            <p>
              Explore tutors, compare their expertise, and find someone
              who can help you master your topic.
            </p>

            <div className="tutor-search-hero-points">
              <span>
                <GraduationCap size={17} />
                Subject Experts
              </span>

              <span>
                <Video size={17} />
                Online & Offline
              </span>

              <span>
                <Star size={16} />
                Compare Ratings
              </span>
            </div>
          </div>

          <div className="tutor-search-hero-icon">
            <GraduationCap size={78} strokeWidth={1.4} />
          </div>
        </section>

        <section className="tutor-search-controls">
          <div className="tutor-search-input-wrap">
            <Search size={20} />

            <input
              type="search"
              aria-label="Search tutors"
              placeholder="Search by tutor name, subject, or skill..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            {searchText && (
              <button
                type="button"
                className="tutor-search-clear"
                aria-label="Clear search"
                onClick={() => setSearchText('')}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`tutor-search-filter-toggle ${
              showFilters ? 'active' : ''
            }`}
            onClick={() => setShowFilters((previous) => !previous)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </section>

        {showFilters && (
          <section className="tutor-search-filter-panel">
            <div className="tutor-search-filter-heading">
              <div>
                <h2>Filter Tutors</h2>
                <p>Refine the list according to your preferences.</p>
              </div>

              <button
                type="button"
                className="tutor-search-reset"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>

            <div className="tutor-search-filter-grid">
              <div className="form-group">
                <label htmlFor="tutorSubject">Subject</label>

                <select
                  id="tutorSubject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                >
                  <option value="All Subjects">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Programming">Programming</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutorMode">Teaching Mode</label>

                <select
                  id="tutorMode"
                  value={classMode}
                  onChange={(event) => setClassMode(event.target.value)}
                >
                  <option value="Any Mode">Any Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutorRating">Minimum Rating</label>

                <select
                  id="tutorRating"
                  value={minimumRating}
                  onChange={(event) =>
                    setMinimumRating(event.target.value)
                  }
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3.0+ Stars</option>
                  <option value="4">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutorBudget">Maximum Hourly Budget</label>

                <select
                  id="tutorBudget"
                  value={maximumPrice}
                  onChange={(event) => setMaximumPrice(event.target.value)}
                >
                  <option value="250">Up to ₹250</option>
                  <option value="300">Up to ₹300</option>
                  <option value="400">Up to ₹400</option>
                  <option value="500">Up to ₹500</option>
                  <option value="1000">Any Budget</option>
                </select>
              </div>
            </div>
          </section>
        )}

        <section className="tutor-search-results">
          <div className="tutor-search-results-heading">
            <div>
              <h2>Available Tutors</h2>
              <p>
                {filteredTutors.length}{' '}
                {filteredTutors.length === 1 ? 'tutor' : 'tutors'} found
                for your preferences
              </p>
            </div>

            <div className="tutor-search-sort">
              <label htmlFor="tutorSort">Sort by</label>

              <select
                id="tutorSort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredTutors.length > 0 ? (
            <div className="tutor-search-results-grid">
              {filteredTutors.map((tutor) => (
                <article className="tutor-result-card" key={tutor.id}>
                  <div className="tutor-result-top">
                    <div className={`tutor-result-avatar ${tutor.color}`}>
                      {tutor.initials}
                    </div>

                    <div className="tutor-result-rating">
                      <Star size={15} fill="currentColor" />
                      <strong>{tutor.rating.toFixed(1)}</strong>
                      <span>({tutor.reviews})</span>
                    </div>
                  </div>

                  <div className="tutor-result-name-row">
                    <h3>{tutor.name}</h3>

                    {tutor.verified && (
                      <span
                        className="tutor-result-verified"
                        title="Sample verified status"
                      >
                        <BadgeCheck size={17} />
                      </span>
                    )}
                  </div>

                  <p className="tutor-result-subject">{tutor.subject}</p>

                  <p className="tutor-result-qualification">
                    <GraduationCap size={15} />
                    {tutor.qualification}
                  </p>

                  <p className="tutor-result-experience">
                    <Clock size={15} />
                    {tutor.experience}
                  </p>

                  <p className="tutor-result-bio">{tutor.bio}</p>

                  <div className="tutor-result-tags">
                    {tutor.mode.map((mode) => (
                      <span
                        className="tutor-result-tag"
                        key={mode}
                      >
                        {mode === 'Online' ? (
                          <Video size={13} />
                        ) : (
                          <MapPin size={13} />
                        )}
                        {mode}
                      </span>
                    ))}
                  </div>

                  <div className="tutor-result-card-footer">
                    <div className="tutor-result-price">
                      <strong>₹{tutor.price}</strong>
                      <span>/ hour</span>
                    </div>

                    <Link
                      to={`/student/tutors/${tutor.id}`}
                      className="tutor-result-view-button"
                      state={{ tutor }}
                    >
                      View Profile
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tutor-search-empty">
              <div className="tutor-search-empty-icon">
                <UserRound size={34} />
              </div>

              <h3>No tutors found</h3>

              <p>
                Try changing your search term or adjusting the filters
                to find more tutors.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={resetFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        <div className="tutor-search-demo-note">
          <strong>Demo data:</strong> Tutor profiles, prices, ratings, and
          verification labels are sample content. Live tutor results will
          be loaded from the backend after API integration.
        </div>
      </div>
    </StudentLayout>
  );
}

export default TutorSearch;