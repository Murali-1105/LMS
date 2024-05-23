from django.urls import path
from .views import get_student_dashboard

urlpatterns = [
    path('get_student dashboard',get_student_dashboard,name='get_student_dashboard'),
]