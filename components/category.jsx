// Category.jsx
import { Link } from 'react-router-dom';

const categories = [
  'Business', 'Arts', 'Technology', 'Science', 'Geopolitics',
  'History', 'Health', 'Sports', 'Geography', 'Education' 
];

export default function Category() {
  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          letterSpacing: '1px',
        }}
      >
        Explore Categories
      </h2>
      <div className="d-flex flex-wrap justify-content-center">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="m-2 text-decoration-none"
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(45deg, #ff6600, #ff9900)',
              color: '#fff',
              borderRadius: '50px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
