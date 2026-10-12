import json
from datetime import date

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Booking


def book(request):
    return render(request, "book.html")


def reservations(request):
    bookings = Booking.objects.all().order_by(
        "reservation_date",
        "reservation_slot"
    )

    booking_data = [
        {
            "id": booking.id,
            "first_name": booking.first_name,
            "reservation_date": str(booking.reservation_date),
            "reservation_slot": booking.reservation_slot,
        }
        for booking in bookings
    ]

    return render(
        request,
        "reservations.html",
        {"bookings_json": json.dumps(booking_data, indent=2)}
    )


@csrf_exempt
def bookings(request):
    if request.method == "GET":
        reservation_date = request.GET.get("date")

        if reservation_date:
            booking_objects = Booking.objects.filter(
                reservation_date=reservation_date
            ).order_by("reservation_slot")
        else:
            booking_objects = Booking.objects.all().order_by(
                "reservation_date",
                "reservation_slot"
            )

        data = [
            {
                "model": "restaurant.booking",
                "pk": booking.id,
                "fields": {
                    "first_name": booking.first_name,
                    "reservation_date": str(booking.reservation_date),
                    "reservation_slot": booking.reservation_slot,
                }
            }
            for booking in booking_objects
        ]

        return JsonResponse(data, safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            first_name = data.get("first_name")
            reservation_date = data.get("reservation_date")
            reservation_slot = data.get("reservation_slot")

            if not first_name or not reservation_date or not reservation_slot:
                return JsonResponse(
                    {"error": "All fields are required."},
                    status=400
                )

            if Booking.objects.filter(
                reservation_date=reservation_date,
                reservation_slot=reservation_slot
            ).exists():
                return JsonResponse(
                    {"error": "This time slot is already booked."},
                    status=400
                )

            booking = Booking.objects.create(
                first_name=first_name,
                reservation_date=reservation_date,
                reservation_slot=reservation_slot
            )

            return JsonResponse({
                "success": True,
                "id": booking.id,
                "message": "Booking created successfully."
            })

        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON."},
                status=400
            )

    return JsonResponse({"error": "Method not allowed."}, status=405)