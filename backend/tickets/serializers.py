from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    # These read-only fields send the human-readable text to React
    status_display = serializers.CharField(
        source='get_status_display', read_only=True)
    priority_display = serializers.CharField(
        source='get_priority_display', read_only=True)
    category_display = serializers.CharField(
        source='get_category_display', read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'  # This includes all fields from the model, plus the 3 custom ones above
