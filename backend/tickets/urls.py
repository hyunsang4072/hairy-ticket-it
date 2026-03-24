from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet

router = DefaultRouter()
# The 'r' before the string means it's a raw string, a good habit for URL routing
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
