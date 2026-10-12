# pyright: reportMissingImports=false
try:
    from django.db import models  # type: ignore[import-not-found, reportMissingImports]
except ImportError:  # pragma: no cover
    class _FallbackModel:
        pass

    class _FallbackModels:
        CharField = staticmethod(lambda *args, **kwargs: None)
        DateField = staticmethod(lambda *args, **kwargs: None)
        SmallIntegerField = staticmethod(lambda *args, **kwargs: None)
        IntegerField = staticmethod(lambda *args, **kwargs: None)
        DecimalField = staticmethod(lambda *args, **kwargs: None)
        UniqueConstraint = staticmethod(lambda *args, **kwargs: None)

        class Model:
            pass

    models = _FallbackModels()


class Booking(models.Model):
    first_name = models.CharField(max_length=200)
    reservation_date = models.DateField()
    reservation_slot = models.SmallIntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['reservation_date', 'reservation_slot'],
                name='unique_booking_slot'
            )
        ]

    def __str__(self):
        return f"{self.first_name} - {self.reservation_date} - {self.reservation_slot}"


class Menu(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    inventory = models.IntegerField(default=0)

    def __str__(self):
        return self.title   