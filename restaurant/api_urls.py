from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api_views import MenuViewSet, BookingViewSet

router = DefaultRouter()

router.register(
    'menu-items',
    MenuViewSet,
    basename='menu-items'
)

router.register(
    'bookings',
    BookingViewSet,
    basename='bookings'
)

urlpatterns = [
    path('', include(router.urls)),
]