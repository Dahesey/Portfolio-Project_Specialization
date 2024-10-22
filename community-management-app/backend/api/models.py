from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'admin'),
        ('frontdesk', 'frontdesk'),
        ('finance', 'finance'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='frontdesk')
    