
from django.db import models


class Booking(models.Model):
    first_name = models.CharField(max_length=200)
    reservation_date = models.DateField()
    reservation_slot = models.SmallIntegerField()

    # Additional fields for React booking form
    guests = models.PositiveSmallIntegerField(default=2)
    occasion = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["reservation_date", "reservation_slot"],
                name="unique_booking_slot"
            )
        ]

    def __str__(self):
        return (
            f"{self.first_name} - "
            f"{self.reservation_date} - "
            f"{self.reservation_slot}"
        )


class Menu(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    inventory = models.IntegerField(default=0)

    def __str__(self):
        return self.title
