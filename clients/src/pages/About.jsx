import React, { useState, useEffect } from 'react';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/iday/a.jpg",
      title: "FITNESS MEETS FUN",
      description: "Transform your workouts into exciting gaming adventures",
      buttonText: "GET STARTED",
      link: "/yoga"
    },
    {
      image: "/iday/b.jpg",
      title: "GAMIFIED FITNESS EXPERIENCE",
      description: "Earn rewards while getting fit with our innovative platform",
      buttonText: "EXPLORE NOW",
      link: "/yoga"
    },
    {
      image: "/iday/c.jpg",
      title: "PLAY. MOVE. ACHIEVE.",
      description: "Your favorite games with real fitness benefits",
      buttonText: "JOIN TODAY",
      link: "/yoga"
    },
    {
      image: "/iday/d.jpg",
      title: "FIT FOR LIFE",
      description: "Making fitness enjoyable for kids and adults alike",
      buttonText: "START YOUR JOURNEY",
      link: "/yoga"
    },
    {
      image: "/iday/e.jpg",
      title: "FIT FOR LIFE",
      description: "Making fitness enjoyable for kids and adults alike",
      buttonText: "START YOUR JOURNEY",
      link: "/yoga"
    },
    {
      image: "/iday/f.jpg",
      title: "FIT FOR LIFE",
      description: "Making fitness enjoyable for kids and adults alike",
      buttonText: "START YOUR JOURNEY",
      link: "/yoga"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <>
      <style jsx>{`
        .carousel-container {
          position: relative;
          overflow: hidden;
          height: 100vh;
          min-height: 600px;
        }

        .carousel-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s ease-in-out, transform 1.2s ease-in-out;
          background-position: center;
          background-size: contain;
          transform: scale(1.1);
        }

        .carousel-item.active {
          opacity: 1;
          transform: scale(1);
        }

        .carousel-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--aairo-overlay-black-30);
        }

        .carousel-caption {
          position: absolute;
          bottom: 30%;
          left: 0;
          right: 0;
          z-index: 10;
          text-align: center;
        }

        .carousel-title {
          font-size: 4rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 8px var(--aairo-overlay-black-60);
          background: linear-gradient(
            to right,
            var(--aairo-orange),
            var(--aairo-red)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInDown 1s both;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .cta-button {
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(
            135deg,
            var(--aairo-orange),
            var(--aairo-red)
          );
          color: white;
          border-radius: 50px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 15px var(--aairo-overlay-orange-30);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px var(--aairo-overlay-orange-40);
          color: white;
          text-decoration: none;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: var(--aairo-overlay-white-20);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          color: white;
          font-size: 1.5rem;
        }

        .carousel-control:hover {
          background: var(--aairo-overlay-white-30);
        }

        .carousel-control.prev {
          left: 20px;
        }

        .carousel-control.next {
          right: 20px;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 20;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .carousel-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--aairo-overlay-white-50);
          margin: 0 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-indicator.active {
          background: white;
          transform: scale(1.2);
        }

        @media (max-width: 1199px) {
          .carousel-title {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 991px) {
          .carousel-title {
            font-size: 3rem;
          }

          .section-title .title {
            font-size: 36px;
          }
        }

        @media (max-width: 767px) {
          .carousel-container {
            height: 80vh;
            min-height: 500px;
          }

          .carousel-title {
            font-size: 2.5rem;
          }

          .section-title .title {
            font-size: 32px;
          }

          .carousel-control {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 575px) {
          .carousel-title {
            font-size: 2rem;
          }

          .cta-button {
            padding: 12px 30px;
          }

          .section-title .title {
            font-size: 28px;
          }
        }
      `}</style>

      <div id="home" className="slider-area">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? 'active' : ''
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center"></div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="carousel-control prev"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            &#8249;
          </button>

          <button
            className="carousel-control next"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            &#8250;
          </button>

          <ul className="carousel-indicators">
            {slides.map((_, index) => (
              <li
                key={index}
                className={`carousel-indicator ${
                  index === currentSlide ? 'active' : ''
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">
            About AAIRO
          </h1>

          <div className="bg-gray-800 rounded-lg p-10 shadow-xl">
            <h2 className="text-[var(--aairo-orange)] text-2xl md:text-3xl font-semibold mb-6">
              Automation with Artificial Intelligence and Robotics
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              AAIRO is a dynamic society dedicated to advancing the frontiers of artificial intelligence and robotics.
              We bring together passionate students and faculty to explore, innovate, and create cutting-edge solutions
              for tomorrow's challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-[var(--aairo-orange)] text-xl font-semibold mb-3">
                  Our Mission
                </h3>

                <p className="text-gray-400">
                  To foster innovation in AI and robotics through research, collaboration, and hands-on learning experiences.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-[var(--aairo-orange)] text-xl font-semibold mb-3">
                  Our Vision
                </h3>

                <p className="text-gray-400">
                  To be a leading force in shaping the future of technology and creating solutions that benefit society.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-[var(--aairo-orange)] text-xl font-semibold mb-3">
                  Our Values
                </h3>

                <p className="text-gray-400">
                  Innovation, collaboration, excellence, and ethical technology development guide everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;