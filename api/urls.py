from django.urls import path
from .views import get_course

urlpatterns = [
    
    path('course',get_course,name='get_course'),

]
