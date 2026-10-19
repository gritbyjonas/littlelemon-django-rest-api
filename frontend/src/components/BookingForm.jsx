
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingApi";

const availableTimes = [
  { value: 17, label: "5:00 PM" },
  { value: 18, label: "6:00 PM" },
  { value: 19, label: "7:00 PM" },
  { value: 20, label: "8:00 PM" },
  { value: 21, label: "9:00 PM" },
];

function localToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function BookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    reservation_date: "",
    reservation_slot: "",
    guests: "2",
    occasion: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  }

  function validate() {
    const nextErrors = {};

    if (!formData.first_name.trim()) {
      nextErrors.first_name = "Please enter your name.";
    }

    if (!formData.reservation_date) {
      nextErrors.reservation_date = "Please select a date.";
    } else if (formData.reservation_date < localToday()) {
      nextErrors.reservation_date =
        "Reservation date cannot be in the past.";
    }

    if (!formData.reservation_slot) {
      nextErrors.reservation_slot =
        "Please select a reservation time.";
    }

    const guests = Number(formData.guests);

    if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
      nextErrors.guests = "Please select between 1 and 10 guests.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        reservation_date: formData.reservation_date,
        reservation_slot: Number(formData.reservation_slot),
        guests: Number(formData.guests),
        occasion: formData.occasion,
      };

      const booking = await createBooking(payload);

      navigate("/confirmed", {
        state: {
          booking,
          reservation: payload,
        },
      });
    } catch (error) {
      setServerError(
        error.message || "Unable to complete your booking."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
    >
      <div className="form-group">
        <label htmlFor="first_name">Your name *</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          maxLength={200}
          required
          aria-invalid={Boolean(errors.first_name)}
          aria-describedby={
            errors.first_name ? "first_name-error" : undefined
          }
        />
        {errors.first_name && (
          <p className="field-error" id="first_name-error">
            {errors.first_name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="reservation_date">
          Reservation date *
        </label>
        <input
          id="reservation_date"
          name="reservation_date"
          type="date"
          min={localToday()}
          value={formData.reservation_date}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.reservation_date)}
          aria-describedby={
            errors.reservation_date
              ? "reservation_date-error"
              : undefined
          }
        />
        {errors.reservation_date && (
          <p className="field-error" id="reservation_date-error">
            {errors.reservation_date}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="reservation_slot">
          Reservation time *
        </label>
        <select
          id="reservation_slot"
          name="reservation_slot"
          value={formData.reservation_slot}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.reservation_slot)}
          aria-describedby={
            errors.reservation_slot
              ? "reservation_slot-error"
              : undefined
          }
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>
        {errors.reservation_slot && (
          <p className="field-error" id="reservation_slot-error">
            {errors.reservation_slot}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests *</label>
        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.guests)}
          aria-describedby={
            errors.guests ? "guests-error" : undefined
          }
        />
        {errors.guests && (
          <p className="field-error" id="guests-error">
            {errors.guests}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
        >
          <option value="">No special occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {serverError && (
        <p className="server-error" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        className="primary-button booking-submit"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Make Your Reservation"}
      </button>
    </form>
  );
}
