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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_password = self.password
    
    def save(self, *args, **kwargs):
        # Hash the password only if it's set and it's a new user or the password has changed
        if self.password and (not self.pk or self._state.adding or self.password != self._original_password):
            self.set_password(self.password)
        super().save(*args, **kwargs)