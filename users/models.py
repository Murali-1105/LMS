# User Model Logic
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    types=[
        ("student","student"),
        ("teacher","teacher"),
        ("admin","admin"),
        
    ]
    user_type=models.CharField(max_length=100,choices=types)
    college=models.ForeignKey('api.College',on_delete=models.PROTECT,null=True)