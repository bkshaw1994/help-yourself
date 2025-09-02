import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../api/slices/uiSlice";
import Carousel from "../../components/Carousel";
import { Zap, Shield, Smartphone, Rocket, Globe, Star } from "lucide-react";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Help Yourself - Find Your Dream Job in India"));
  }, [dispatch]);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Help Yourself</h1>
          <p className="hero-description">
            India's premier job portal connecting talented professionals with leading employers. 
            Find your dream career or hire exceptional talent across all major Indian cities.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Explore Jobs</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>

          {/* Mobile: Static Grid layout */}
          <div className="features-grid mobile-only">
            <div className="feature-card">
              <div className="feature-icon"><Zap size={32} /></div>
              <h3>Fast Performance</h3>
              <p>Built with modern technologies for optimal performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Shield size={32} /></div>
              <h3>Secure</h3>
              <p>
                Industry-standard security practices to keep your data safe.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Smartphone size={32} /></div>
              <h3>Responsive</h3>
              <p>Works perfectly on all devices and screen sizes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Rocket size={32} /></div>
              <h3>Easy to Use</h3>
              <p>
                Intuitive interface designed for the best user experience.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Globe size={32} /></div>
              <h3>Global Reach</h3>
              <p>
                Connect with opportunities worldwide and expand your horizons.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Star size={32} /></div>
              <h3>Top Quality</h3>
              <p>Premium features and excellent support for all users.</p>
            </div>
          </div>

          {/* Desktop: Auto-rotating Carousel layout */}
          <div className="features-carousel-container">
            <Carousel
              slidesToShow={3}
              slidesToScroll={1}
              autoPlay={true}
              autoPlayInterval={6000}
              showDots={true}
              showArrows={true}
              infinite={true}
              className="features-carousel external-arrows wide-carousel"
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              <div className="feature-card">
                <div className="feature-icon"><Zap size={48} /></div>
                <h3>Fast Performance</h3>
                <p>Built with modern technologies for optimal performance.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Shield size={48} /></div>
                <h3>Secure</h3>
                <p>
                  Industry-standard security practices to keep your data safe.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Smartphone size={48} /></div>
                <h3>Responsive</h3>
                <p>Works perfectly on all devices and screen sizes.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Rocket size={48} /></div>
                <h3>Easy to Use</h3>
                <p>
                  Intuitive interface designed for the best user experience.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Globe size={48} /></div>
                <h3>Global Reach</h3>
                <p>
                  Connect with opportunities worldwide and expand your horizons.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Star size={48} /></div>
                <h3>Top Quality</h3>
                <p>Premium features and excellent support for all users.</p>
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
