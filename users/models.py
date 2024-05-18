from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    types=[
        ("Vels","Vels"),
        ("Crescent","Crescent")
    ]
    user_type=models.CharField(max_length=300,choices=types)
