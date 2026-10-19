
from datetime import date

from django.db import IntegrityError, transaction
from rest_framework import serializers

from .models import Booking, Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id",
            "first_name",
            "reservation_date",
            "reservation_slot",
            "guests",
            "occasion",
        ]
        read_only_fields = ["id"]

    def validate_first_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Please enter your name."
            )

        return value

    def validate_reservation_date(self, value):
        if value < date.today():
            raise serializers.ValidationError(
                "Reservation date cannot be in the past."
            )

        return value

    def validate_reservation_slot(self, value):
        if value not in [17, 18, 19, 20, 21]:
            raise serializers.ValidationError(
                "Please select a valid reservation time."
            )

        return value

    def validate_guests(self, value):
        if value < 1 or value > 10:
            raise serializers.ValidationError(
                "Number of guests must be between 1 and 10."
            )

        return value

    def validate(self, attrs):
        reservation_date = attrs.get(
            "reservation_date",
            getattr(self.instance, "reservation_date", None)
        )

        reservation_slot = attrs.get(
            "reservation_slot",
            getattr(self.instance, "reservation_slot", None)
        )

        if reservation_date is not None and reservation_slot is not None:
            existing = Booking.objects.filter(
                reservation_date=reservation_date,
                reservation_slot=reservation_slot
            )

            if self.instance:
                existing = existing.exclude(pk=self.instance.pk)

            if existing.exists():
                raise serializers.ValidationError({
                    "reservation_slot":
                        "This reservation time is already booked."
                })

        return attrs

    def create(self, validated_data):
        try:
            with transaction.atomic():
                return Booking.objects.create(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                "reservation_slot":
                    "This reservation time is already booked."
            })
