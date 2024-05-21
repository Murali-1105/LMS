from django.contrib import admin
from .models import User as CustomUser,Student,Teacher


admin.site.register(Teacher)
admin.site.register(CustomUser)
admin.site.register(Student)
