from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(viewsets.ModelViewSet):
    # We order by '-created_at' so the newest tickets appear at the top of the list
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
