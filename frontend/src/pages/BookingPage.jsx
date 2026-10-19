
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <div className="booking-layout">
      <aside className="booking-visual">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
          alt="Warm restaurant dining area ready for guests"
        />

        <div className="booking-visual-overlay">
          <span className="eyebrow eyebrow-light">
            YOUR SEAT AT THE TABLE
          </span>
          <h2>
            Good moments
            <br />
            start <em>here.</em>
          </h2>
          <p>
            Delicious food, warm company and a little
            Mediterranean sunshine.
          </p>
        </div>
      </aside>

      <section
        className="booking-panel"
        aria-labelledby="booking-title"
      >
        <div className="booking-panel-inner">
          <span className="eyebrow">LET'S GET TOGETHER</span>

          <h1 id="booking-title">
            Book a <em>table.</em>
          </h1>

          <p className="booking-intro">
            We'd love to have you. Pick your perfect
            date and time, and we'll take care of the rest.
          </p>

          <div className="booking-form-shell">
            <BookingForm />
          </div>

          <p className="booking-note">
            ✳ We can't wait to welcome you to Little Lemon.
          </p>
        </div>
      </section>
    </div>
  );
}
