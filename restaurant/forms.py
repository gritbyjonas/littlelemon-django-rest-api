from django import forms
from .models import Booking


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['first_name', 'reservation_date', 'reservation_slot']
        widgets = {
            'reservation_date': forms.DateInput(
                attrs={'type': 'date'}
            ),
        }