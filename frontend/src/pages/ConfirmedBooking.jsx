
import { Link, useLocation } from "react-router-dom";

export default function ConfirmedBooking() {
  const location = useLocation();
  const reservation = location.state?.reservation;
  const booking = location.state?.booking;

  if (!reservation || !booking?.id) {
    return (
      <section className="confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-icon" aria-hidden="true">
            ✳
          </div>

          <span className="eyebrow">LITTLE LEMON</span>
          <h1>No reservation found</h1>

          <p className="confirmation-description">
            We couldn't find your booking details.
            Please make a new reservation.
          </p>

          <Link to="/booking" className="btn btn-primary">
            Book a Table <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(
    `${reservation.reservation_date}T12:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(
    2000,
    0,
    1,
    Number(reservation.reservation_slot)
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const details = [
    ["Booking reference", `#${booking.id}`],
    ["Guest name", reservation.first_name],
    ["Reservation date", formattedDate],
    ["Reservation time", formattedTime],
    ["Number of guests", reservation.guests],
    ["Occasion", reservation.occasion || "None"],
  ];

  return (
    <section className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-icon" aria-hidden="true">
          ✓
        </div>

        <span className="eyebrow">
          YOUR TABLE IS RESERVED
        </span>

        <h1>
          It's a <em>date!</em>
        </h1>

        <p className="confirmation-description" role="status">
          Thank you, {reservation.first_name}!
          Your reservation at Little Lemon is confirmed.
          We can't wait to welcome you.
        </p>

        <div className="confirmation-details">
          <div className="confirmation-details-header">
            <div>
              <span className="eyebrow">RESERVATION SUMMARY</span>
              <h2>Your booking details</h2>
            </div>
            <span className="confirmation-status">
              Confirmed
            </span>
          </div>

          <dl className="confirmation-detail-list">
            {details.map(([label, value]) => (
              <div className="confirmation-detail" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="confirmation-message">
          <span aria-hidden="true">✳</span>
          <p>
            Great food, warm company, and wonderful
            memories are waiting for you.
          </p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            Back to Homepage
            <span aria-hidden="true">↗</span>
          </Link>

          <Link to="/booking" className="outline-button">
            Make Another Booking
          </Link>
        </div>
      </div>
    </section>
  );
}
