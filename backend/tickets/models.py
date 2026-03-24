from django.db import models


class Ticket(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
        ('CLOSED', 'Closed'),
    ]

    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),  # For when the servers are literally on fire
    ]

    CATEGORY_CHOICES = [
        ('HARDWARE', 'Hardware'),
        ('SOFTWARE', 'Software'),
        ('NETWORK', 'Network'),
        ('ACCESS', 'Access/Password Reset'),
        ('OTHER', 'Other'),
    ]

    # Core Information
    title = models.CharField(max_length=200)
    description = models.TextField()
    submitter_email = models.EmailField(
        help_text="Email of the user reporting the issue")

    # Categorization & Triage
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='OPEN')
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default='MEDIUM')
    category = models.CharField(
        max_length=20, choices=CATEGORY_CHOICES, default='OTHER')

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.get_priority_display()}] {self.title} - {self.get_status_display()}"
