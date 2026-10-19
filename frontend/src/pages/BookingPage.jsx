
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <section className="page-container booking-page">
      <div className="page-heading">
        <h1>Reserve a Table</h1>

        <p>
          Experience the flavors of Little Lemon.
          Choose your preferred reservation date,
          time, and number of guests.
        </p>
      </div>

      <div className="booking-card">
        <h2>Table Reservation</h2>
        <BookingForm />
      </div>
    </section>
  );
}
