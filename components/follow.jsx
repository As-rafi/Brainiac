// FollowUs.jsx
export default function FollowUs() {
    return (
      <div className="container my-5">
        <h2
          className="text-center mb-4"
          style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}
        >
          Follow Us
        </h2>
        <div className="d-flex justify-content-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon twitter"
          >
            <i className="fa-brands fa-square-x-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
  
        <style>{`
          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: #fff;
            text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .social-icon.facebook {
            background-color: #197fcc;
          }
          .social-icon.twitter {
            background-color: #333;
          }
          .social-icon.linkedin {
            background-color: #0077b5;
          }
          .social-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          .social-icon i {
            font-size: 24px;
          }
        `}</style>
      </div>
    );
  }
  