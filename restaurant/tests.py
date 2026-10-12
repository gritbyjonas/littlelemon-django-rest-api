from datetime import date, timedelta

from django.contrib.auth.models import User
from django.test import TestCase
from django.db import IntegrityError, transaction

from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from .models import Menu, Booking


class MenuAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.staff = User.objects.create_user(
            username="teststaff",
            password="StrongTestPassword123!",
            is_staff=True
        )

        self.customer = User.objects.create_user(
            username="testcustomer",
            password="StrongTestPassword123!"
        )

        self.menu = Menu.objects.create(
            title="Greek Salad",
            price="12.50",
            inventory=20
        )

    def test_get_menu_items(self):
        response = self.client.get("/api/menu-items/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_customer_cannot_add_menu_item(self):
        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            "/api/menu-items/",
            {
                "title": "Pasta",
                "price": "15.00",
                "inventory": 10
            }
        )

        self.assertEqual(response.status_code, 403)

    def test_staff_can_add_menu_item(self):
        self.client.force_authenticate(user=self.staff)

        response = self.client.post(
            "/api/menu-items/",
            {
                "title": "Pasta",
                "price": "15.00",
                "inventory": 10
            }
        )

        self.assertEqual(response.status_code, 201)


class BookingAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.customer = User.objects.create_user(
            username="bookingcustomer",
            password="StrongTestPassword123!"
        )

        self.booking_date = date.today() + timedelta(days=7)

    def test_unauthenticated_booking_access(self):
        response = self.client.get("/api/bookings/")

        self.assertEqual(response.status_code, 401)

    def test_authenticated_booking_creation(self):
        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            "/api/bookings/",
            {
                "first_name": "John",
                "reservation_date": str(self.booking_date),
                "reservation_slot": 15
            }
        )

        self.assertEqual(response.status_code, 201)

    def test_duplicate_booking_rejected(self):
        Booking.objects.create(
            first_name="John",
            reservation_date=self.booking_date,
            reservation_slot=15
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Booking.objects.create(
                    first_name="Jane",
                    reservation_date=self.booking_date,
                    reservation_slot=15
                )


class AuthenticationTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        response = self.client.post(
            "/auth/users/",
            {
                "username": "newtestuser",
                "password": "SecureRegistration987!"
            }
        )

        self.assertEqual(response.status_code, 201)

    def test_token_authentication(self):
        user = User.objects.create_user(
            username="tokenuser",
            password="StrongTestPassword123!"
        )

        token = Token.objects.create(user=user)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

        response = self.client.get("/api/bookings/")

        self.assertEqual(response.status_code, 200)