from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    church_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=10)

    def __str__(self):
        return self.user.username
