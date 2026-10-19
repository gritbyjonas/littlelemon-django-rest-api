
import { Link, useLocation } from "react-router-dom";

export default function ConfirmedBooking() {
  const location = useLocation();

  const reservation = location.state?.reservation;
  const booking = location.state?.booking;

  if (!reservation || !booking?.id) {
    return (
      <section className="page-container confirmation-page">
        <div className="confirmation-card">
          <h1>No Reservation Found</h1>

          <p>
            No reservation details are available.
            Please make a new reservation.
          </p>

          <Link to="/booking" className="primary-button">
            Make a Reservation
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
    reservation.reservation_slot
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section className="page-container confirmation-page">
      <div className="confirmation-card">
        <div
          className="confirmation-icon"
          aria-hidden="true"
        >
          🍋
        </div>

        <h1>Reservation Confirmed!</h1>

        <p role="status">
          Thank you, {reservation.first_name}!
          Your table has been reserved successfully.
        </p>

        <div className="reservation-details">
          <h2>Booking Details</h2>

          <p>
            <strong>Booking ID:</strong> {booking.id}
          </p>

          <p>
            <strong>Name:</strong> {reservation.first_name}
          </p>

          <p>
            <strong>Date:</strong> {formattedDate}
          </p>

          <p>
            <strong>Time:</strong> {formattedTime}
          </p>

          <p>
            <strong>Number of Guests:</strong> {reservation.guests}
          </p>

          <p>
            <strong>Occasion:</strong>{" "}
            {reservation.occasion || "None"}
          </p>
        </div>

        <p>
          We look forward to welcoming you to Little Lemon!
        </p>

        <Link to="/" className="primary-button">
          Return to Homepage
        </Link>
      </div>
    </section>
  );
}
