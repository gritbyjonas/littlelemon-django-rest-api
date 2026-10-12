from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='book', permanent=False)),
    path('admin/', admin.site.urls),
    path('', include('restaurant.urls')),
    path('api/', include('restaurant.api_urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]