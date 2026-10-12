from rest_framework import viewsets
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAuthenticated,
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
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        # Until Booking has an owner field, editing existing
        # reservations is restricted to staff.
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsStaffOrReadOnlyForBookings()]

        return [permission() for permission in self.permission_classes]


class IsStaffOrReadOnlyForBookings(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_staff
        )