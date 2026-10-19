from rest_framework import viewsets
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    AllowAny,
)

from .models import Menu, Booking
from .serializers import MenuSerializer, BookingSerializer


class IsStaffOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and request.user.is_staff
        )


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all().order_by("id")
    serializer_class = MenuSerializer
    permission_classes = [IsStaffOrReadOnly]


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by("id")
    serializer_class = BookingSerializer

    def get_permissions(self):
        # Guests may create reservations.
        if self.action == "create":
            return [AllowAny()]

        # Only staff can view or manage reservations.
        return [IsStaffOnly()]


class IsStaffOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_staff
        )