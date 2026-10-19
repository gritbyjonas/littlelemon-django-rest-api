
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { createBooking } from "../services/bookingApi";

const mockNavigate = vi.fn();

vi.mock("../services/bookingApi", () => ({
  createBooking: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderForm() {
  return render(
    <MemoryRouter>
      <BookingForm />
    </MemoryRouter>
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/your name/i), {
    target: { value: "Test Customer" },
  });

  fireEvent.change(screen.getByLabelText(/reservation date/i), {
    target: { value: "2099-10-25" },
  });

  fireEvent.change(screen.getByLabelText(/reservation time/i), {
    target: { value: "19" },
  });

  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "2" },
  });

  fireEvent.change(screen.getByLabelText(/occasion/i), {
    target: { value: "Birthday" },
  });
}

describe("BookingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all booking fields", () => {
    renderForm();

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reservation time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    renderForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    );

    expect(
      await screen.findByText("Please enter your name.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please select a date.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please select a reservation time.")
    ).toBeInTheDocument();

    expect(createBooking).not.toHaveBeenCalled();
  });

  it("rejects a past reservation date", async () => {
    renderForm();
    fillValidForm();

    fireEvent.change(screen.getByLabelText(/reservation date/i), {
      target: { value: "2020-01-01" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    );

    expect(
      await screen.findByText(
        "Reservation date cannot be in the past."
      )
    ).toBeInTheDocument();

    expect(createBooking).not.toHaveBeenCalled();
  });

  it("rejects more than 10 guests", async () => {
    renderForm();
    fillValidForm();

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "11" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    );

    expect(
      await screen.findByText(
        "Please select between 1 and 10 guests."
      )
    ).toBeInTheDocument();

    expect(createBooking).not.toHaveBeenCalled();
  });

  it("submits a valid booking and navigates to confirmation", async () => {
    createBooking.mockResolvedValue({
      id: 100,
      first_name: "Test Customer",
      reservation_date: "2099-10-25",
      reservation_slot: 19,
      guests: 2,
      occasion: "Birthday",
    });

    renderForm();
    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    );

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalledWith({
        first_name: "Test Customer",
        reservation_date: "2099-10-25",
        reservation_slot: 19,
        guests: 2,
        occasion: "Birthday",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/confirmed",
      expect.objectContaining({
        state: expect.objectContaining({
          booking: expect.objectContaining({ id: 100 }),
        }),
      })
    );
  });

  it("shows an error when the API rejects a booking", async () => {
    createBooking.mockRejectedValue(
      new Error("This reservation time is already booked.")
    );

    renderForm();
    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "This reservation time is already booked."
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
