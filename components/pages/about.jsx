// About.jsx
export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-title">About Us</h1>
        <p className="about-intro">
          Welcome to Brainiac, where curiosity meets creativity! Our mission is to provide a space for knowledge seekers, creative thinkers, and passionate learners to explore, engage, and grow together. At Brainiac, we believe that everyone has the potential to be a genius in their own way—all it takes is a spark of inspiration.
        </p>

        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Brainiac is more than just a blog site; it's a vibrant community of dreamers, doers, and discoverers. Founded by a group of passionate individuals with diverse expertise—from science and technology to arts and philosophy—we aim to create a platform that celebrates the beauty of interdisciplinary thinking. Our team is dedicated to sharing thought-provoking content, unique perspectives, and actionable insights to empower you on your journey of discovery.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <p>
            Our blog is a treasure trove of ideas, covering topics such as:
          </p>
          <ul>
            <li>
              <strong>Science & Innovation:</strong>
              <span> Dive into the latest breakthroughs, fascinating discoveries, and futuristic technologies shaping our world.</span>
            </li>
            <li>
              <strong>Geopolitics:</strong>
              <span> Explore the intricate dynamics of power, conflicts, alliances, and the ever-changing global landscape.</span>
            </li>
            <li>
              <strong>Arts and Culture:</strong>
              <span> Experience the richness of human creativity through inspiring stories, trends, and reflections on art, music, literature, and history.</span>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose Brainiac?</h2>
          <p>
            In an age of information overload, finding quality, well-researched, and engaging content can be a challenge. That’s where Brainiac comes in. We’re dedicated to curating content that is:
          </p>
          <ul>
            <li>
              <strong>Credible:</strong>
              <span> Our writers and contributors are experts and enthusiasts passionate about their fields.</span>
            </li>
            <li>
              <strong>Engaging:</strong>
              <span> We prioritize storytelling and creativity to make learning enjoyable.</span>
            </li>
            <li>
              <strong>Thought-Provoking:</strong>
              <span> We encourage readers to think deeper, question the status quo, and explore alternative perspectives.</span>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Meet the Team</h2>
          <p>
            Behind Brainiac is a team of writers, researchers, and enthusiasts who are committed to delivering high-quality content. From tech geeks and history buffs to creative artists and wellness advocates, our diverse team brings a rich tapestry of perspectives to every piece we publish.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            Looking ahead, Brainiac aims to become a global hub for knowledge and creativity. We envision a world where learning is not just a necessity but a joy, and where curiosity leads to innovation and connection. Together, let’s build a future driven by curiosity, collaboration, and a relentless pursuit of knowledge.
          </p>
        </section>

        <section className="about-section">
          <h2>Thank You for Being Here</h2>
          <p>
            Your presence here means the world to us. Whether you're here to explore, learn, or connect, we hope Brainiac adds value to your life. Let’s embrace the joy of learning and the thrill of discovery—one article at a time.
          </p>
        </section>

        <hr />

        <section className="follow-us">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </section>

        <section className="subscribe">
          <h3>Subscribe</h3>
          <div className="subscribe-video">
            <iframe
              width="100%"
              height="215"
              src="https://www.youtube.com/embed/ZOUuXYoBPno?si=Zz4_os2zvhmnDpFn"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          padding: 40px 20px;
          background-color: #fff;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .about-title {
          font-size: 36px;
          margin-bottom: 20px;
          text-align: center;
        }
        .about-intro {
          font-size: 16px;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 40px;
        }
        .about-section {
          margin-bottom: 40px;
        }
        .about-section h2 {
          font-size: 28px;
          margin-bottom: 15px;
          color: #222;
        }
        .about-section p {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 15px;
        }
        .about-section ul {
          list-style: none;
          padding: 0;
        }
        .about-section ul li {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }
        .about-section ul li strong {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .follow-us,
        .subscribe {
          text-align: center;
          margin-bottom: 40px;
        }
        .follow-us h3,
        .subscribe h3 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 32px;
        }
        .social-icons a {
          color: inherit;
          transition: color 0.3s;
        }
        .social-icons a:hover {
          color: #ff6600;
        }
        .subscribe-video {
          margin: 0 auto;
          max-width: 360px;
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 15px;
          }
          .subscribe-video {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
