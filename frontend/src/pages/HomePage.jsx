
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const dishes = [
  {
    id: 1,
    name: "The Greek Salad",
    category: "FRESH & VIBRANT",
    price: "$12.99",
    description:
      "Crisp romaine, juicy tomatoes, Kalamata olives, creamy feta and our house-made lemon dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    alt: "Fresh Mediterranean salad with colorful vegetables",
  },
  {
    id: 2,
    name: "Bruschetta",
    category: "A LITTLE CLASSIC",
    price: "$8.99",
    description:
      "Rustic toasted sourdough topped with vine-ripened tomatoes, fresh basil and golden olive oil.",
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=1000&q=85",
    alt: "Bruschetta served with tomatoes and herbs",
  },
  {
    id: 3,
    name: "Lemon Dessert",
    category: "SWEET FINISH",
    price: "$6.99",
    description:
      "A light, sunshine-bright dessert with fresh citrus flavor and just the right touch of sweetness.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
    alt: "Beautifully presented sweet dessert",
  },
];

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.slice(1)
      );

      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [location.hash]);

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-light">
            ✳ A LITTLE TASTE OF THE MEDITERRANEAN
          </span>

          <h1>
            Good food.
            <br />
            <em>Great company.</em>
            <br />
            Little Lemon.
          </h1>

          <p>
            A little sunshine on every plate. Experience
            Mediterranean flavors, family recipes and
            the joy of gathering around the table.
          </p>

          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">
              Reserve Your Table
              <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/#menu" className="text-link light-link">
              Explore the menu <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="hero-bottom-note">
            <span className="mini-line" />
            <span>MADE WITH LOVE IN CHICAGO</span>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <img
            className="hero-photo"
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85"
            alt="Fresh Mediterranean food served at the table"
          />
          <div className="hero-photo-label">
            <span>FRESH DAILY</span>
            <strong>Always something delicious.</strong>
          </div>
        </div>
      </section>

      <div className="marquee-strip" aria-hidden="true">
        <span>FRESH INGREDIENTS</span>
        <span>✳</span>
        <span>FAMILY RECIPES</span>
        <span>✳</span>
        <span>GOOD TIMES</span>
        <span>✳</span>
        <span>MEDITERRANEAN SOUL</span>
      </div>

      <section
        id="menu"
        className="menu-section section-pad"
        aria-labelledby="menu-title"
      >
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2 id="menu-title" className="section-title">
                A few of our <em>favorites.</em>
              </h2>
              <p className="section-description">
                Simple ingredients. Bold flavors. Made fresh,
                served with love.
              </p>
            </div>

            <Link to="/booking" className="outline-button">
              Reserve a Table <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="dish-grid">
            {dishes.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <div className="dish-image-wrap">
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    loading="lazy"
                  />
                  <span className="dish-category">
                    {dish.category}
                  </span>
                </div>

                <div className="dish-content">
                  <div className="dish-title-row">
                    <h3>{dish.name}</h3>
                    <span className="dish-price">{dish.price}</span>
                  </div>

                  <p>{dish.description}</p>

                  <Link to="/booking" className="dish-action">
                    Save me a seat <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="story-section"
        aria-labelledby="story-title"
      >
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
            alt="Warm and welcoming restaurant dining interior"
            loading="lazy"
          />
        </div>

        <div className="story-content">
          <span className="eyebrow">OUR LITTLE STORY</span>

          <h2 id="story-title">
            Food tastes better
            <br />
            <em>together.</em>
          </h2>

          <p>
            At Little Lemon, we believe a great meal is about
            more than what's on the plate. It's about the
            conversations, laughter and memories shared
            around it.
          </p>

          <p>
            Inspired by Mediterranean traditions, we bring
            honest ingredients, vibrant flavors and a warm
            welcome to our Chicago neighborhood.
          </p>

          <Link to="/booking" className="text-link dark-link">
            Come dine with us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <span className="eyebrow eyebrow-light">
            YOUR TABLE IS WAITING
          </span>

          <h2>
            Make room for
            <br />
            <em>something wonderful.</em>
          </h2>

          <p>
            A memorable meal is just a reservation away.
          </p>

          <Link to="/booking" className="btn btn-primary">
            Book Your Table <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
