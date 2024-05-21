from django.contrib import admin
from .models import User as CustomUser



admin.site.register(CustomUser)
