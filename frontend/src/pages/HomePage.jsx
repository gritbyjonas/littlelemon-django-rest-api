
import { Link } from "react-router-dom";

const specials = [
  {
    id: 1,
    name: "Greek Salad",
    price: "$12.99",
    description:
      "Fresh vegetables, Kalamata olives, and feta cheese with our signature dressing.",
    icon: "🥗",
  },
  {
    id: 2,
    name: "Bruschetta",
    price: "$8.99",
    description:
      "Grilled bread topped with fresh tomatoes, garlic, basil, and olive oil.",
    icon: "🍞",
  },
  {
    id: 3,
    name: "Lemon Dessert",
    price: "$6.99",
    description:
      "Our signature lemon dessert made with a sweet and refreshing citrus flavor.",
    icon: "🍰",
  },
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>

            <p>
              We are a family-owned Mediterranean restaurant
              focused on traditional recipes served with a
              modern twist.
            </p>

            <Link
              to="/booking"
              className="primary-button"
            >
              Reserve a Table
            </Link>
          </div>

          <div
            className="hero-illustration"
            aria-hidden="true"
          >
            🍋
          </div>
        </div>
      </section>

      <section
        id="specials"
        className="specials"
        aria-labelledby="specials-title"
      >
        <div className="section-heading">
          <h2 id="specials-title">
            This Week's Specials
          </h2>

          <Link
            to="/booking"
            className="secondary-button"
          >
            Book a Table
          </Link>
        </div>

        <div className="specials-grid">
          {specials.map((item) => (
            <article
              className="special-card"
              key={item.id}
            >
              <div
                className="special-image"
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <div className="special-content">
                <div className="special-title-row">
                  <h3>{item.name}</h3>
                  <span className="special-price">
                    {item.price}
                  </span>
                </div>

                <p>{item.description}</p>

                <Link
                  to="/booking"
                  className="special-link"
                >
                  Reserve a Table →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <h2>About Little Lemon</h2>

          <p>
            Little Lemon is a charming neighborhood restaurant
            serving Mediterranean cuisine in the heart of
            Chicago. Our menu features fresh ingredients,
            traditional family recipes, and modern flavors.
          </p>

          <p>
            Whether you're enjoying a casual lunch or
            celebrating a special occasion, we look forward
            to welcoming you.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
